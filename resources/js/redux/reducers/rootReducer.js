import {combineReducers} from 'redux'
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import {chatReducer} from "./chat/chatReducer";
import {lastMessagesReducer} from "./chat/lastMessagesReducer";
import {conversationReducer} from "./chat/conversationReducer";
import {activeUserIdReducer} from "./chat/activeUserIdReducer";
import {messageReducer} from "./chat/messageReducer";
import {unreadMessagesCountReducer} from "./chat/unreadMessagesCountReducer";
import {cacheConversationReducer} from "./chat/cacheConversationReducer";
import {recipientReducer} from "./chat/recipientReducer";
import {getAllChannelsReducer} from "./channel/getAllChannelsReducer";
import {getOnePublicChannelReducer} from "./channel/getOnePublicChannelReducer";
import {modifiedChannelReducer} from "./channel/modifiedChannelReducer";
import {notificationReducer} from "./chat/notificationReducer";
import {getOnePrivateChannelReducer} from "./channel/getOnePrivateChannelReducer";
import {publicChannelMessagesReducer} from "./chat/publicChannelMessagesReducer";
import {toggleChannelMessagesReducer} from "./chat/toggleChannelMessagesReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    lastMessages: lastMessagesReducer,
    conversation: conversationReducer,
    cache: cacheConversationReducer,
    activeUserId: activeUserIdReducer,
    message: messageReducer,
    unreadMessagesCount: unreadMessagesCountReducer,
    recipient: recipientReducer,
    getAllChannels: getAllChannelsReducer,
    oneChannel: getOnePublicChannelReducer,
    onePrivateChannel: getOnePrivateChannelReducer,
    modifyFlag: modifiedChannelReducer,
    notifications: notificationReducer,
    roomMessages: publicChannelMessagesReducer,
    toggleMessages: toggleChannelMessagesReducer
})
