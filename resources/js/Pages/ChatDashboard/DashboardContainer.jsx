import React, {Component, createRef} from 'react';
import {CustomNav} from "../../Components/Details/CustomNav";
import {Dashboard} from "./Dashboard";
import {connect} from "react-redux";
import {LogoutAction, OnlineChatUsersAction, ProfileAction} from "../../redux/actions/auth/authAction";
import {withRouter} from "react-router-dom";
import {
    AddLocalMsgToConversationAction,
    FetchConversationWithAction,
    FetchFriendsAction,
    FetchLastMessagesAction,
    FetchLastMessageWithAction,
    GetNotificationsAction,
    MessageChatChannelAction,
    SendMessageToAction,
    SetMessageAction,
} from "../../redux/actions/chat/userChatAction";
import {echoInstance} from "../../bootstrap";
import {GetAllChannelsAction, GetAllPrivateChannelsAction} from "../../redux/actions/channel/channelAction";
import PropTypes from "prop-types";
import {EchoChannelSelect, EchoOnlineChatUsers, joinToPublicChannel} from "../../redux/actions/echo/echoActions";


class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: new Audio('/sounds/facebookchat.mp3'),
        }
        this.logout = this.logout.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
    }

    token = localStorage.getItem('user-token')
    messagesEnd = createRef()

    componentDidMount() {
        const echo = echoInstance(this.token)
        this.props.FetchFriendsAction(this.token)
        this.props.GetAllChannelsAction(this.token)
        this.props.FetchLastMessagesAction(this.token)
        this.props.GetNotificationsAction(this.token)
        this.props.GetAllPrivateChannelsAction(this.token)

        if (this.token !== undefined) {
            this.props.ProfileAction(this.token).then(() => {
                this.props.MessageChatChannelAction(echo, this.token, this.props.profile.id, this.state.notification)
                this.props.joinToPublicChannel(this.props.profile.id, this.token)
                this.props.OnlineChatUsersAction(true)
                // this.props.EchoOnlineChatUsers(this.token)
            })
            this.scrollToBottom()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom()
    }

    scrollToBottom() {
        this.messagesEnd.current?.addEventListener('DOMNodeInserted', event => {
            const {currentTarget: target} = event
            target.scroll({top: target.scrollHeight, behavior: 'smooth'})
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
                    notifications={this.state.notification}
                    messagesEnd={this.messagesEnd}
                    friends={this.props.friends}
                    activeUserId={this.props.activeUserId}
                    isLoading={this.props.isLoading}
                    conversation={this.props.conversation}
                    lastMessages={this.props.lastMessages}
                    profile={this.props.profile}
                    publicMessages={this.props.publicMessages}
                    privateMessages={this.props.privateMessages}
                    publicChannel={this.props.publicChannel}
                    privateChannel={this.props.privateChannel}
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
    publicMessages: state.publicRoomMessages.publicMessages,
    privateMessages: state.privateRoomMessages.privateMessages,
    publicChannel: state.oneChannel,
    privateChannel: state.onePrivateChannel,
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
    GetNotificationsAction,
    joinToPublicChannel,
    EchoChannelSelect,
    OnlineChatUsersAction,
    EchoOnlineChatUsers
})(DashboardWithRouterContainer)


