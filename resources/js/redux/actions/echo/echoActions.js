import {echoInstance} from "../../../bootstrap";
import * as ChatActionTypes from "../../types/chatActionTypes";
import {toast} from "react-toastify";
import {toastOptions} from "../../utils";
import * as ChannelActionTypes from "../../types/channelActionTypes";
import {ChannelDmSelectAction, ChannelsSelectAction, GetAllPrivateChannelsAction} from "../channel/channelAction";
import {OnlineChatUsersAction, RemoveOnlineUserAfterLoggedOutAction} from "../auth/authAction";


export const initNotificationAndEventChannels = (user, token) => async (dispatch, getState) => {
    const echo = echoInstance(token)
    await echo.private(`App.Models.User.User.${user.id}`)
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
    await echo.private(`event.acceptRequest.${user.id}`)
        .listen('AcceptRequest', (data) => {
            dispatch(GetAllPrivateChannelsAction(token))
            toast(`${data[0]}, channel type: ${data[1]}`, toastOptions('top-right'))
        })
    await echo.private('create-channel')
        .listen('CreateChannelEvent', (channel) => {
            switch (channel.channel.type) {
                case 'channel':
                    dispatch({type: ChannelActionTypes.CHANNEL_CREATED_SUCCESS, payload: channel.channel})
                    toast.success(channel.message, toastOptions('top-right'))
                    break;
                case 'dm':
                    console.log('echo layer', channel)
                    dispatch({type: ChannelActionTypes.CREATE_PRIVATE_CHANNEL, payload: channel.channel})
                    toast.success(channel.message, toastOptions('top-right'))
                    break;
                default:
                    break;
            }
        })
    await echo.private('delete-channel')
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
    await echo.private('base-channel')
        .listen('StatusEvent', (data) => {
            if (data.message.includes('online')) {
                dispatch(OnlineChatUsersAction(true))
            } else if (data.message.includes('offline')) {
                dispatch(RemoveOnlineUserAfterLoggedOutAction(data.user))
            }
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

export const EchoChannelSelect = (ID, token) => async (dispatch, getState) => {
    const echo = echoInstance(token)
    const authId = getState().auth.profile.id
    await echo.private(`chat.channel.${ID}`)
        .listen('SendMessageToChannel', (data) => {
            let sender_id = data.data.user_id
            let id = data.data.channel_id
            console.log('echo ', sender_id)
            console.log('authId', authId)
            if (ID === id) {
                if (sender_id !== authId) {
                    dispatch(ChannelsSelectAction(data.data, token))
                }
            }
            console.log('last message')
        })
}

export const EchoOnlineChatUsers = (token) => async (dispatch) => {
    let echo = echoInstance(token)
    await echo.private('chat')
        .listen('OnlineUsers', (data) => {
            console.log('echo online users', data)
        })
}

export const OnlineEchoPublicChannelsUsers = (channel, token) => (dispatch) => {
    const echo = echoInstance(token)
    echo.private(`online.public.channel.users.${channel.id}`)
        .listen('ChannelsOnlineUsers', (data) => {
            let hereUsers = []

            console.log('OnlineEchoPublicChannelsUsers, data', [...hereUsers, data.user])
        })
}

export const EchoDmSelect = (channel, token) => async (dispatch, getState) => {
    const echo = echoInstance(token)
    const authId = getState().auth.profile.id
    await echo.private(`chat.dm.${channel.id}`)
        .listen('SendMessageToChannel', (data) => {
            let id = data.data.channel_id
            let sender_id = data.data.user_id
            if (channel.id === id) {
                if (authId !== sender_id) {
                    dispatch(ChannelDmSelectAction(data.data, token))
                }
            }
            // dispatch({
            //     type: ChatActionTypes.SENT_PRIVATE_CHANNEL_MESSAGE,
            //     payload: data.data
            // })
        })
        .listenForWhisper('SendMessageToChannel', (event) => {
            console.log('listenForWhisper,', event)
        })
}

export const LeavingEchoChannel = (channel, token) => (dispatch) => {
    const echo = echoInstance(token)
    echo.join(`chat.channel.${channel.id}`)
        .stopListening('SendMessageToChannel')
    console.log('LeavingEchoChannel')
}




