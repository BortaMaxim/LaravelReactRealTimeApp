import * as ChatActionTypes from '../types/chatActionTypes'
import {BASE_AUTH_URL, getAuthOptions, postAuthOptions} from '../utils'
import {IS_FETCHING_RECIPIENT} from "../types/chatActionTypes";

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
        axios.get(`${BASE_AUTH_URL}conversation/${id}`, getAuthOptions(token)).then(res => {
            dispatch({
                type: ChatActionTypes.SET_ACTIVE_USER_ID,
                payload: id
            })
            dispatch({type: ChatActionTypes.FETCH_CONVERSATION_WITH, payload: res.data.messages})
            dispatch({type: ChatActionTypes.FETCH_RECIPIENT, payload: res.data.recipient})
            dispatch({
                type: ChatActionTypes.FETCH_LAST_MESSAGE_WITH,
                payload: {
                    id: id,
                    message: res.data.messages[res.data.messages.length - 1]
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


export const UnreadMessagesCountAction = (token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}unread-messages/count`, getAuthOptions(token)).then(res => {
        dispatch({type: ChatActionTypes.FETCH_UNREAD_MESSAGES_COUNT, payload: res.data})
    })
}

export const ConnectChatChannelAction = (echo, token, profileId, notification) => (dispatch, getState) => {
    // let activeUserId = getState().activeUserId
    echo.private(`user-channel.${profileId}`)
        .listen('MessageEvent', (event) => {
            let msg = event.message
            console.log(getState().activeUserId)
            if (msg.sender_id === getState().activeUserId) {
                console.log('FetchConversationWithAction')
                dispatch(FetchConversationWithAction(msg.sender_id, token, true))
            } else {
                console.log('FetchLastMessageWithAction')
                dispatch(FetchLastMessageWithAction(msg.sender_id, token))
            }

            if (!document.hasFocus()) notification.play()
        })
}

