import * as ChannelActionTypes from '../types/channelActionTypes'
import * as ChatActionTypes from '../types/chatActionTypes'
import axios from 'axios'
import {BASE_AUTH_URL, getAuthOptions, postAuthOptions, toastOptions} from '../utils'
import {toast} from 'react-toastify'
import {channelSelect, dmSelect} from "./echoActions";


export const CreateChannelAction = (formData, token) => async (dispatch) => {
    dispatch({type: ChannelActionTypes.IS_CREATING_CHANNEL})
    await axios.post(`${BASE_AUTH_URL}create-channel`, formData, postAuthOptions(token))
        .then(res => {
            return res
        })
        .catch(err => {
            dispatch({type: ChannelActionTypes.CHANNEL_CREATED_ERROR, payload: err.response})
        })
}

export const GetAllChannelsAction = (token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}get-all-channels`, getAuthOptions(token))
        .then(res => {
            dispatch({type: ChannelActionTypes.GET_ALL_CHANNELS, payload: res.data})
        })
}

export const GetAllPrivateChannelsAction = (token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}get-all-private-channels`, getAuthOptions(token))
        .then(res => {
            dispatch({type: ChannelActionTypes.GET_ALL_PRIVATE_CHANNELS, payload: res.data})
        })
}

export const GetOnePublicChannel = (id, token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}get-channel/${id}`, getAuthOptions(token))
        .then(res => {
            dispatch({type: ChannelActionTypes.GET_ONE_CHANNEL, channel: res.data.data})
            dispatch({type: ChannelActionTypes.MODIFIED_AFTER_DELETE_CHANNEL, payload: res.data.modify})
        })
}

export const GetOnePrivateChannelAction = (id, token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}get-private-channel/${id}`, getAuthOptions(token))
        .then(res => {
            dispatch({type: ChannelActionTypes.GET_ONE_PRIVATE_CHANNEL, channel: res.data.data})
            dispatch({type: ChannelActionTypes.MODIFIED_AFTER_DELETE_CHANNEL, payload: res.data.modify})
        })
}

export const DeleteChannelAction = (id, token, type = null) => async (dispatch) => {
    await axios.delete(`${BASE_AUTH_URL}delete-channel/${id}`, getAuthOptions(token))
        .then(res => {
            return res
        })
}

export const JoinToChannel = (channelId, data, token) => async (dispatch) => {
    let {channelType} = data
    switch (channelType) {
        case 'channel':
            await axios.post(`${BASE_AUTH_URL}join-channel/${channelId}`, data, postAuthOptions(token))
                .then(res => {
                    dispatch(GetAllChannelsAction(token))
                    toast.success(res.data, toastOptions('top-right'))
                })
            break;
        case 'dm':
            let dataChannel = {
                channelType
            }
            await axios.post(`${BASE_AUTH_URL}join-channel/${channelId}`, dataChannel, postAuthOptions(token))
                .then(res => {
                    toast.success(res.data, toastOptions('top-right'))
                })
            break;
        default:
            break;
    }
}

export const InviteToChannelAction = (data, token) => async (dispatch) => {
    await axios.post(`${BASE_AUTH_URL}invite-to-channel`, data, postAuthOptions(token))
        .then(res => {
            dispatch({type: ChannelActionTypes.INVITE_TO_CHANNEL_SUCCESS})
            toast.success(res.data, toastOptions('top-right'))
        })
}

export const ChannelsSelectAction = (channel, token) => async (dispatch, getState) => {
    let prevChannelId = getState().oneChannel
    let authUserId = getState().auth.profile.id
    let usersOfChannel = channel.users
    let foundedUser = usersOfChannel.find(user => user.id === authUserId)

    await axios.get(`${BASE_AUTH_URL}get-message-to/${channel.id}`, getAuthOptions(token))
        .then((res) => {
            switch (channel.channel_type) {
                case 'channel':
                    if (res.status === 200) {
                        dispatch({type: ChatActionTypes.TOGGLE_CHANNEL_MESSAGES, payload: 'publicMessages'})
                        dispatch({type: ChatActionTypes.FETCH_PUBLIC_CHANNEL_MESSAGES, payload: res.data})
                        if (foundedUser !== undefined) {
                            dispatch(channelSelect(channel.id, prevChannelId, token))
                        } else {
                            toast.success('you must join to the channel!', toastOptions('top-right'))
                        }
                    }
                    break;
                case 'dm':
                    if (res.status === 200) {
                        dispatch({type: ChatActionTypes.TOGGLE_CHANNEL_MESSAGES, payload: 'privateMessages'})
                        dispatch({type: ChatActionTypes.FETCH_PRIVATE_CHANNEL_MESSAGES, payload: res.data})
                        if (foundedUser !== undefined) {
                            dispatch(dmSelect(channel.id, prevChannelId, token))
                        } else {
                            toast.success('you must join to the private channel!', toastOptions('top-right'))
                        }
                    }
                    break;
                default:
                    break;
            }
        })
}
