import * as ChatActionTypes from '../../types/chatActionTypes'
import {BASE_AUTH_URL, postAuthOptions} from "../../utils";


export const SetPrivateMessageAction = (message) => (dispatch) => {
    dispatch({
        type: ChatActionTypes.SET_PRIVATE_MESSAGE,
        payload: message
    })
}

export const AddPrivateMessageAction = () => (dispatch, getState) => {
    let message = getState().privateMessage
    let profile = getState().auth.profile
    dispatch({
        type: ChatActionTypes.ADD_PRIVATE_MESSAGE,
        payload: {
            id: Math.floor(Math.random() * (99999 - 10000)) + 10000,
            user: {
                id: profile.id,
                avatar: profile.avatar
            },
            message: message
        }
    })
}

export const SendPrivateMessageAction = (channel, token) => async (dispatch, getState) => {
    let message = getState().privateMessage
    await axios.post(`${BASE_AUTH_URL}send-message-to/${channel.id}`, {message2: message}, postAuthOptions(token))
        .then(res => {
            return res
        })
}
