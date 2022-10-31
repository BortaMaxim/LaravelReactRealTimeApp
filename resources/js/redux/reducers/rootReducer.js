import {combineReducers} from 'redux'
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import {chatReducer} from "./chat/chatReducer";
import {conversationCacheReducer} from "./conversationCacheReducer";
import {lastMessagesReducer} from "./chat/lastMessagesReducer";
import {conversationReducer} from "./chat/conversationReducer";
import {activeUserIdReducer} from "./chat/activeUserIdReducer";
import {messageReducer} from "./chat/messageReducer";
import {unreadMessagesCountReducer} from "./chat/unreadMessagesCountReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    lastMessages: lastMessagesReducer,
    conversation: conversationReducer,
    cache: conversationCacheReducer,
    activeUserId: activeUserIdReducer,
    message: messageReducer,
    unreadMessagesCount: unreadMessagesCountReducer
})
