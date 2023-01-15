import * as ChannelActionTypes from '../types/channelActionTypes'
import axios from 'axios'
import {BASE_AUTH_URL, postAuthOptions, getAuthOptions, toastOptions} from '../utils'
import {toast} from 'react-toastify'


export const CreateChannelAction = (formData, token) => async (dispatch, getState) => {
    dispatch({type: ChannelActionTypes.IS_CREATING_CHANNEL})
    await axios.post(`${BASE_AUTH_URL}create-channel`, formData, postAuthOptions(token))
        .then(res => {
            let channels = getState().getAllChannels
            let privateChannels = getState().getAllPrivateChannels
            if (res.data.type === 'channel') {
                console.log('channels', channels)
                channels.push(res.data)
                dispatch({type: ChannelActionTypes.CHANNEL_CREATED_SUCCESS})
            }
            if (res.data.type === 'dm') {
                privateChannels.push(res.data)
                dispatch({type: ChannelActionTypes.CREATE_PRIVATE_CHANNEL})
            }
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

export const DeleteChannelAction = (id, token) => async (dispatch) => {
    await axios.delete(`${BASE_AUTH_URL}delete-channel/${id}`, getAuthOptions(token))
        .then(res => {
            dispatch({
                type: ChannelActionTypes.DELETE_CHANNEL_SUCCESS,
                id
            })
            dispatch({
                type: ChannelActionTypes.MODIFIED_AFTER_DELETE_CHANNEL,
                payload: res.data.modify
            })
            toast.success(res.data.message, toastOptions('top-right'))
        })
}

export const JoinToPublicChannel = (channelId, data, token) => async (dispatch) => {
    let {channelType} = data
    switch (channelType) {
        case 'channel':
            await axios.post(`${BASE_AUTH_URL}join-channel/${channelId}`, data, postAuthOptions(token))
                .then(res => {
                    dispatch({type: ChannelActionTypes.JOIN_TO_PUBLIC_CHANNEL})
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
