import {echoInstance} from "../../bootstrap";
import * as ChatActionTypes from "../types/chatActionTypes";
import {toast} from "react-toastify";
import {toastOptions} from "../utils";

export const initNotificationAndEventChannels = (userId, token, dispatch) => {
    const echo = echoInstance(token)
    echo.private(`App.Models.User.User.${userId}`)
        .notification((notification) => {
            dispatch({
                type: ChatActionTypes.REALTIME_NOTIFICATIONS,
                payload: {
                    data: notification,
                    read_at: null,
                    id: notification.id,
                }
            })
        })
}

export const statusEventUserChannels = (token) => {
    const echo = echoInstance(token)
    echo.private('base-channel')
        .listen('StatusEvent', (data) => {
            toast(data.message, toastOptions('bottom-right'))
        })
}
