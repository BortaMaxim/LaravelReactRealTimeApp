import {echoInstance} from "../../bootstrap";
import * as ChatActionTypes from "../types/chatActionTypes";
import {toast} from "react-toastify";
import {toastOptions} from "../utils";
import * as ChannelActionTypes from "../types/channelActionTypes";
import {GetAllPrivateChannelsAction} from "./channelAction";


export const echoPresenceInit = (token) => {
    return echoInstance(token)
}
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

export const channelSelect = (channelId, prevChannelId = null, token) => async (dispatch) => {
    await echoPresenceInit(token).join(`chat.channel.${channelId}`)
        .listen('SendMessageToChannel', (data) => {
            console.log('listen,', data)
        })
        .listenForWhisper('typing', (event) => {
            console.log('listenForWhisper,', event)
        })
}

export const dmSelect = (channelId, prevChannelId, token) => async (dispatch) => {
    await echoPresenceInit(token).join(`chat.dm.${channelId}`)
        .here( (user) => {
            console.log('here private', user)
        })
        .joining((user) => {
            console.log('joining', user)
        })
        .listen('', (data) => {
            console.log('listen', data)
        })
        .listenForWhisper('typing', (event) => {
            console.log('listenForWhisper,', event)
        })
}




