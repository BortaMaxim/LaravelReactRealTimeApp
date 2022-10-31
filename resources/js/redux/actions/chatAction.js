import * as ChatActionTypes from '../types/chatActionTypes'
import {BASE_AUTH_URL, getAuthOptions, postAuthOptions} from '../utils'

export const FetchFriendsAction = (token) => async (dispatch) => {
    dispatch({type: ChatActionTypes.IS_FETCHING_FRIENDS})
    await axios.get(`${BASE_AUTH_URL}friends`, getAuthOptions(token)).then(res => {
        dispatch({type: ChatActionTypes.FETCH_FRIENDS, payload: res.data})
    })
}

export const SetMessageAction = (message) => (dispatch) => {
    dispatch({
        type: ChatActionTypes.SET_MESSAGE,
        payload: message
    })
}

export const SendMessageToAction = (id, token) => async (dispatch, getState) =>
    await new Promise(async (resolve, reject) => {
        await axios.post(`${BASE_AUTH_URL}conversation/${id}`, {message: getState().message}, postAuthOptions(token)).then(() => {
            resolve()
        })
    })

export const FetchConversationWithAction = (id, token, force = false) => (dispatch, getState) =>

    new Promise((resolve, reject) => {
        let cached = getState().cache[id]
        let lastMessage = getState().lastMessages[id]

        if (!force && cached !== undefined && (!lastMessage || cached[cached.length - 1].id === lastMessage.id)) {
            dispatch({
                type: ChatActionTypes.FETCH_CONVERSATION_WITH,
                payload: cached
            });

            resolve();
            return;
        }
        axios.get(`${BASE_AUTH_URL}conversation/${id}`, getAuthOptions(token)).then(res => {
            if (getState().activeUserId !== id) return
            dispatch({type: ChatActionTypes.FETCH_CONVERSATION_WITH, payload: res.data})
            dispatch({
                type: ChatActionTypes.FETCH_LAST_MESSAGE_WITH,
                payload: {
                    id,
                    message: res.data[res.data.length - 1]
                }
            })
            resolve()
        })
    })

export const FetchLastMessageWithAction = (id, token) => async (dispatch) =>
    await new Promise(async (resolve, reject) => {
        await axios.get(`${BASE_AUTH_URL}conversation/last/${id}`, getAuthOptions(token)).then(res => {

            dispatch({
                type: ChatActionTypes.FETCH_LAST_MESSAGE_WITH,
                payload: {
                    id,
                    message: res.data
                }
            })
        })
        resolve()
    })

export const FetchLastMessagesAction = (token) => async (dispatch) =>
    await new Promise(async (resolve, reject) => {
        await axios.get(`${BASE_AUTH_URL}conversation/last`, getAuthOptions(token)).then(res => {
            dispatch({
                type: ChatActionTypes.FETCH_LAST_MESSAGES,
                payload: res.data
            })
            resolve()
        })
    })

export const AddLocalMsgToConversationAction = () => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: ChatActionTypes.ADD_LOCAL_MSG_TO_CONVERSATION,
            payload: getState().message
        });
        resolve();
    })

export const SetActiveUserIdAction = id => async (dispatch, getState) =>
    await new Promise((resolve, reject) => {
        let conversation = getState().conversation;
        let currentId = getState().activeUserId;

        if (conversation.length &&
            (conversation[conversation.length - 1].sender_id === currentId ||
                conversation[conversation.length - 1].recipient_id === currentId))
            dispatch({
                type: ChatActionTypes.CACHE_CONVERSATION_WITH,
                payload: {
                    id: currentId,
                    conversation
                }
            })
        dispatch({
            type: ChatActionTypes.SET_ACTIVE_USER_ID,
            payload: id
        });
        return resolve()
    })

export const UnreadMessagesCountAction = (token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}unread-messages/count`, getAuthOptions(token)).then(res => {
        dispatch({type: ChatActionTypes.FETCH_UNREAD_MESSAGES_COUNT, payload: res.data})
    })
}

