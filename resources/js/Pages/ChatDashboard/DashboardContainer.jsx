import React, {Component} from 'react';
import {SEND_MESSAGE_TO, SET_ACTIVE_USER_ID} from '../../redux/types/chatActionTypes'
import {CustomNav} from "../../Components/Details/CustomNav";
import {Dashboard} from "./Dashboard";
import {connect} from "react-redux";
import {LogoutAction, ProfileAction} from "../../redux/actions/authAction";
import {withRouter} from "react-router-dom";
import {
    AddLocalMsgToConversationAction,
    FetchConversationWithAction,
    FetchFriendsAction,
    FetchLastMessagesAction,
    FetchLastMessageWithAction,
    SendMessageToAction,
    SetMessageAction
} from "../../redux/actions/chatAction";
import EventBus from "../../EventBus";
import {echoInstance} from "../../bootstrap";


class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            notification: new Audio('/sounds/facebookchat.mp3')
        }
        this.startConversation = this.startConversation.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.logout = this.logout.bind(this)
    }

    token = localStorage.getItem('user-token')

    componentDidMount() {
        const echo = echoInstance(this.token)
        EventBus.on(SET_ACTIVE_USER_ID, this.startConversation)
        EventBus.on(SEND_MESSAGE_TO, () => {
            this.props.FetchConversationWithAction(this.props.activeUserId, this.token)
        });
        this.props.FetchFriendsAction(this.token)
        this.props.FetchLastMessagesAction(this.token)

        if(this.token !== undefined)
        this.props.ProfileAction(this.token).then(() => {
            echo.private(`user-channel.${this.props.profile.id}`)
                .listen('MessageEvent', (event) => {
                    let msg = event.message
                    console.log(msg)
                    if (msg.sender_id === this.props.activeUserId)
                        this.props.FetchConversationWithAction(msg.sender_id, this.token, true)
                    else
                        this.props.FetchLastMessageWithAction(msg.sender_id, this.token)

                    if(!document.hasFocus()) this.state.notification.play()
                })
        })
    }

    startConversation() {
        this.props.FetchConversationWithAction(this.props.activeUserId, this.token)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendMessage(e) {
        e.preventDefault()
        if (!this.state.message) return
        this.props.SetMessageAction(this.state.message)
        this.props.SendMessageToAction(this.props.activeUserId, this.token).then(() => {
            EventBus.emit(SEND_MESSAGE_TO)
            this.props.AddLocalMsgToConversationAction()
        })
        this.setState({
            message: ''
        })
    }

    logout() {
        this.props.LogoutAction(this.token, this.props.history)
    }

    render() {
        return (
            <div>
                <CustomNav logout={this.logout} profile={this.props.profile}/>
                <Dashboard
                    friends={this.props.friends}
                    isLoading={this.props.isLoading}
                    conversation={this.props.conversation}
                    lastMessages={this.props.lastMessages}
                    profile={this.props.profile}
                    sendMessage={this.sendMessage}
                    handleChange={this.handleChange}
                    fields={this.state.message}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    errorResponse: state.auth.errorResponse,
    profile: state.auth.profile,
    isShow: state.auth.isShow,
    isLoading: state.chat.loading,
    friends: state.chat.friends,
    lastMessages: state.lastMessages,
    activeUserId: state.activeUserId,
    conversation: state.conversation,

})

const DashboardWithRouterContainer = withRouter(DashboardContainer)

export default connect(mapStateToProps, {
    FetchConversationWithAction,
    FetchLastMessageWithAction,
    FetchFriendsAction,
    SetMessageAction,
    AddLocalMsgToConversationAction,
    SendMessageToAction,
    FetchLastMessagesAction,
    ProfileAction,
    LogoutAction
})(DashboardWithRouterContainer)

// export const DashboardContainer = () => {
//     const token = localStorage.getItem('user-token')
//     const {fields, handleChange, clear} = useForm({
//         message: ''
//     })
//     const history = useHistory()
//     const dispatch = useDispatch()
//     const profile = authSelector()
//     const chat = chatSelector()
//     const lastMessages = useSelector(state =>  state.lastMessages)
//     const activeUserId = useSelector(state => state.activeUserId)
//     const conversation = useSelector(state => state.conversation)
//     const profileID = profile.profile.id
//     const echo = echoInstance(token)
//
//     useEffect(() => {
//         // if (activeUserId !== 0)
//         EventBus.on(SEND_MESSAGE_TO, () => dispatch(FetchConversationWithAction(activeUserId, token)))
//     }, [activeUserId, token, dispatch])
//
//     useEffect(() => {
//         if (profileID !== undefined) {
//             dispatch(ProfileAction(token)).then(() => {
//                 echo.private(`user-channel.${profileID}`)
//                     .listen('MessageEvent', (event) => {
//                         let msg = event.message
//                         console.log(msg)
//                         if (msg.sender_id === activeUserId) {
//                             console.log('FetchConversationWithAction, true')
//                             console.log('FetchConversationWithAction ActiveUserId ', activeUserId)
//                             dispatch(FetchConversationWithAction(msg.sender_id, token, true))
//                         }else {
//                             console.log('FetchLastMessageWithAction')
//                             console.log('FetchLastMessageWithAction ActiveUserId ', activeUserId)
//                             dispatch(FetchLastMessageWithAction(msg.sender_id, token))
//                         }
//                     })
//             })
//         }
//     }, [profileID, activeUserId, token, ])
//
//
//     const sendMessage = (e) => {
//         e.preventDefault()
//         dispatch(SetMessageAction(fields.message))
//         dispatch(AddLocalMsgToConversationAction())
//         dispatch(SendMessageToAction(activeUserId, token)).then(() => {
//             EventBus.emit(SEND_MESSAGE_TO)
//         })
//         clear()
//     }
//
//     const logout = () => {
//         dispatch(LogoutAction(token, history))
//     }
//     useEffect(() => {
//         dispatch(FetchFriendsAction(token))
//         dispatch(FetchLastMessagesAction(token))
//     }, [dispatch, token])
//
//     return (
//         <div>
//             <CustomNav logout={logout} profile={profile.profile}/>
//             <Dashboard
//                 chat={chat}
//                 conversation={conversation}
//                 lastMessages={lastMessages}
//                 profile={profile}
//                 sendMessage={sendMessage}
//                 handleChange={handleChange}
//                 fields={fields}
//             />
//         </div>
//     )
// }
