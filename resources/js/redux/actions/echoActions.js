import {echoInstance} from "../../bootstrap";
import * as ChatActionTypes from "../types/chatActionTypes";
import {toast} from "react-toastify";
import {toastOptions} from "../utils";
import * as ChannelActionTypes from "../types/channelActionTypes";
import {GetAllPrivateChannelsAction} from "./channelAction";


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
            dispatch(GetAllPrivateChannelsAction(token))
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

export const joinToPublicChannel = (userId, token) => async (dispatch) => {
    const echo = echoInstance(token)
    await echo.private(`join-to-channel.${userId}`)
        .listen('JoinToChannelEvent', (eventMessage) => {
            dispatch(GetAllPrivateChannelsAction(token))
            toast.success(eventMessage.message, toastOptions('top-right'))
        })
}

export const EchoChannelSelect = (channelId, prevChannelId, token) => async (dispatch, getState) => {
    const echo = echoInstance(token)
    console.log('channelId', channelId)
    console.log('prevChannelId', prevChannelId)
    // if (prevChannelId !== null && prevChannelId.id !== channelId) {
    //     echo.leave(`chat.${prevChannelId.type}.${prevChannelId.id}`)
    //     console.log('leave')
    // } else {
    //
    //     console.log(false)
    // }
    await echo.private(`chat.channel.${channelId}`)
        .listen('SendMessageToChannel', (data) => {
            console.log('event data', data)
            // let id = parseInt(data.data.channel_id)
            dispatch({
                type: ChatActionTypes.SENT_PUBLIC_CHANNEL_MESSAGE,
                payload: data.data
            })
        })
        .listenForWhisper('typing', (event) => {
            console.log('listenForWhisper,', event)
        })
}

export const EchoDmSelect = (channelId, token) => async (dispatch) => {
    const echo = echoInstance(token)
    await echo.private(`chat.dm.${channelId}`)
        .listen('SendMessageToChannel', (data) => {
            console.log('listen', data)
            dispatch({
                type: ChatActionTypes.SENT_PRIVATE_CHANNEL_MESSAGE,
                payload: data.data
            })
        })
        .listenForWhisper('typing', (event) => {
            console.log('listenForWhisper,', event)
        })
}




