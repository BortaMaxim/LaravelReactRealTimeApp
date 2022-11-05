import React, {Component, createRef} from 'react';
import '../../../sass/chat.scss'
import {SEND_MESSAGE_TO, SET_ACTIVE_USER_ID} from '../../redux/types/chatActionTypes'
import {CustomNav} from "../../Components/Details/CustomNav";
import {Dashboard} from "./Dashboard";
import {connect} from "react-redux";
import {LogoutAction, ProfileAction} from "../../redux/actions/authAction";
import {withRouter} from "react-router-dom";
import {
    AddLocalMsgToConversationAction, ConnectChatChannelAction,
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
        this.scrollToBottom = this.scrollToBottom.bind(this)
    }

    token = localStorage.getItem('user-token')
    messagesEnd = createRef()

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
            this.props.ConnectChatChannelAction(echo, this.token, this.props.profile.id, this.state.notification)
            // echo.private(`user-channel.${this.props.profile.id}`)
            //     .listen('MessageEvent', (event) => {
            //         let msg = event.message
            //         if (msg.sender_id === this.props.activeUserId)
            //             this.props.FetchConversationWithAction(msg.sender_id, this.token, true)
            //         else
            //             this.props.FetchLastMessageWithAction(msg.sender_id, this.token)
            //
            //         if(!document.hasFocus()) this.state.notification.play()
            //     })
        })
        this.scrollToBottom()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom()
    }

    startConversation() {
        this.props.FetchConversationWithAction(this.props.activeUserId, this.token)
    }

    scrollToBottom() {
        this.messagesEnd.current?.addEventListener('DOMNodeInserted', event => {
            const {currentTarget: target} = event
            target.scroll({top: target.scrollHeight, behavior: 'smooth'})
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendMessage(e) {
        e.preventDefault()
        this.props.SetMessageAction(this.state.message)
        if (!this.state.message) return
        this.props.AddLocalMsgToConversationAction().then(() => {
            this.props.SendMessageToAction(this.props.activeUserId, this.token).then(() => {
                EventBus.emit(SEND_MESSAGE_TO)
            })
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
                    messagesEnd={this.messagesEnd}
                    friends={this.props.friends}
                    activeUserId={this.props.activeUserId}
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
    message: state.message,

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
    LogoutAction,
    ConnectChatChannelAction
})(DashboardWithRouterContainer)
