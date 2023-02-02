import React, {Component, createRef} from 'react';
import {SEND_MESSAGE_TO, SET_ACTIVE_USER_ID} from '../../redux/types/chatActionTypes'
import {CustomNav} from "../../Components/Details/CustomNav";
import {Dashboard} from "./Dashboard";
import {connect} from "react-redux";
import {LogoutAction, ProfileAction, StatusNotificationAction} from "../../redux/actions/authAction";
import {withRouter} from "react-router-dom";
import {
    AddLocalMsgToConversationAction,
    FetchConversationWithAction,
    FetchFriendsAction,
    FetchLastMessagesAction,
    FetchLastMessageWithAction, GetNotificationsAction, MessageChatChannelAction,
    SendMessageToAction,
    SetMessageAction,
} from "../../redux/actions/chatAction";
import EventBus from "../../EventBus";
import {echoInstance} from "../../bootstrap";
import {GetAllChannelsAction, GetAllPrivateChannelsAction} from "../../redux/actions/channelAction";
import PropTypes from "prop-types";
import {channelSelect, joinToPublicChannel} from "../../redux/actions/echoActions";


class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            notification: new Audio('/sounds/facebookchat.mp3'),
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
        this.props.GetAllChannelsAction(this.token)
        this.props.FetchLastMessagesAction(this.token)
        this.props.StatusNotificationAction(this.token)
        this.props.GetNotificationsAction(this.token)
        this.props.GetAllPrivateChannelsAction(this.token)
        // this.props.channelSelect(1, null, this.token)

        if (this.token !== undefined)
            this.props.ProfileAction(this.token).then(() => {
                this.props.MessageChatChannelAction(echo, this.token, this.props.profile.id, this.state.notification)
                this.props.joinToPublicChannel(this.props.profile.id, this.token)
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
                <CustomNav
                    logout={this.logout}
                    profile={this.props.profile}
                />
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
                    publicMessages={this.props.publicMessages}
                    privateMessages={this.props.privateMessages}
                />
            </div>
        )
    }
}

DashboardContainer.propTypes = {
    loading: PropTypes.bool,
    errorResponse: PropTypes.object,
    profile: PropTypes.object,
    isShow: PropTypes.bool,
    isLoading: PropTypes.bool,
    friends: PropTypes.array,
    lastMessages: PropTypes.object,
    activeUserId: PropTypes.number,
    conversation: PropTypes.array,
    message: PropTypes.string,
    FetchConversationWithAction: PropTypes.func.isRequired,
    FetchLastMessageWithAction: PropTypes.func.isRequired,
    FetchFriendsAction: PropTypes.func.isRequired,
    SetMessageAction: PropTypes.func.isRequired,
    AddLocalMsgToConversationAction: PropTypes.func.isRequired,
    SendMessageToAction: PropTypes.func.isRequired,
    FetchLastMessagesAction: PropTypes.func.isRequired,
    ProfileAction: PropTypes.func.isRequired,
    LogoutAction: PropTypes.func.isRequired,
    MessageChatChannelAction: PropTypes.func.isRequired,
    GetAllChannelsAction: PropTypes.func.isRequired,
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
    publicMessages: state.roomMessages.publicMessages,
    privateMessages: state.roomMessages.privateMessages,
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
    MessageChatChannelAction,
    GetAllChannelsAction,
    GetAllPrivateChannelsAction,
    StatusNotificationAction,
    GetNotificationsAction,
    joinToPublicChannel,
    channelSelect,
})(DashboardWithRouterContainer)
