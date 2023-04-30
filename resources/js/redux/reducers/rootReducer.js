import {combineReducers} from 'redux'
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import {chatReducer} from "./chat/userMessages/chatReducer";
import {lastMessagesReducer} from "./chat/userMessages/lastMessagesReducer";
import {conversationReducer} from "./chat/userMessages/conversationReducer";
import {activeUserIdReducer} from "./chat/userMessages/activeUserIdReducer";
import {messageReducer} from "./chat/userMessages/messageReducer";
import {unreadMessagesCountReducer} from "./chat/userMessages/unreadMessagesCountReducer";
// import {cacheConversationReducer} from "./chat/cacheConversationReducer";
import {recipientReducer} from "./chat/userMessages/recipientReducer";
import {getAllChannelsReducer} from "./channel/publicChannels/getAllChannelsReducer";
import {getOnePublicChannelReducer} from "./channel/publicChannels/getOnePublicChannelReducer";
import {modifiedChannelReducer} from "./channel/modifiedChannelReducer";
import {notificationReducer} from "./chat/notification/notificationReducer";
import {getOnePrivateChannelReducer} from "./channel/privateChannels/getOnePrivateChannelReducer";
import {publicMessagesReducer} from "./chat/publicMessages/publicMessagesReducer";
import {toggleChannelMessagesReducer} from "./channel/toggleChannelMessagesReducer";
import {publicMessageReducer} from "./chat/publicMessages/publicMessageReducer";
import {privateMessagesReducer} from "./chat/privateMessages/privateMessagesReducer";
import {privateMessageReducer} from "./chat/privateMessages/privateMessageReducer";
import {echoReducer} from "./channel/echoReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    lastMessages: lastMessagesReducer,
    conversation: conversationReducer,
    // cache: cacheConversationReducer,
    activeUserId: activeUserIdReducer,
    message: messageReducer,
    publicMessage: publicMessageReducer,
    privateMessage: privateMessageReducer,
    unreadMessagesCount: unreadMessagesCountReducer,
    recipient: recipientReducer,
    getAllPublicChannels: getAllChannelsReducer,
    oneChannel: getOnePublicChannelReducer,
    onePrivateChannel: getOnePrivateChannelReducer,
    modifyFlag: modifiedChannelReducer,
    notifications: notificationReducer,
    publicRoomMessages: publicMessagesReducer,
    privateRoomMessages: privateMessagesReducer,
    toggleMessages: toggleChannelMessagesReducer,
    echoState: echoReducer,
})
