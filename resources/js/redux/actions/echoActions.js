import {echoInstance} from "../../bootstrap";
import * as ChatActionTypes from "../types/chatActionTypes";
import {toast} from "react-toastify";
import {toastOptions} from "../utils";
import * as ChannelActionTypes from "../types/channelActionTypes";

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
    echo.private(`event.acceptRequest.${userId}`)
        .listen('AcceptRequest', (data) => {
            toast(`${data[0]}, channel type: ${data[1]}`, toastOptions('top-right'))
        })
    echo.private('create-channel')
        .listen('CreateChannelEvent', (channel) => {
            switch (channel.channel.type) {
                case 'channel':
                    dispatch({type: ChannelActionTypes.CHANNEL_CREATED_SUCCESS, payload: channel.channel})
                    toast.success(channel.message, toastOptions('top-right'))
                    break;
                case 'dm':
                    dispatch({type: ChannelActionTypes.CREATE_PRIVATE_CHANNEL, payload: channel.channel})
                    toast.success(channel.message, toastOptions('top-right'))
                    break;
                default:
                    break;
            }
        })
    echo.private('delete-channel')
        .listen('DeleteChannelEvent', (channel) => {
            dispatch({
                type: ChannelActionTypes.MODIFIED_AFTER_DELETE_CHANNEL,
                payload: channel.modify
            })
            switch (channel.channel.type) {
                case 'channel':
                    dispatch({
                        type: ChannelActionTypes.DELETE_CHANNEL_SUCCESS,
                        id: channel.channel.id
                    })
                    toast.success(channel.message, toastOptions('top-right'))
                    break;
                case 'dm':
                    console.log('event delete private channel', channel)
                    dispatch({
                        type: ChannelActionTypes.DELETE_PRIVATE_CHANNEL_SUCCESS,
                        id: channel.channel.id
                    })
                    toast.success(channel.message, toastOptions('top-right'))
                    break;
                default:
                    break;
            }

        })
}

export const statusEventUserChannels = (token) => {
    const echo = echoInstance(token)
    echo.private('base-channel')
        .listen('StatusEvent', (data) => {
            toast(data.message, toastOptions('bottom-right'))
        })
}

export const createChannelEvent = (token, channels = null, privateChannels = null) => {
    const echo = echoInstance(token)

}

