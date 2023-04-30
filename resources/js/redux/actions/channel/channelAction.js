import * as ChannelActionTypes from '../../types/channelActionTypes'
import * as ChatActionTypes from '../../types/chatActionTypes'
import axios from 'axios'
import {BASE_AUTH_URL, getAuthOptions, postAuthOptions, toastOptions} from '../../utils'
import {toast} from 'react-toastify'
import {compareChannelUsers} from "../../../helpers/helpers";


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

export const GetOnePublicChannel = (id, token) => async (dispatch, getState) => {
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

export const ChannelsSelectAction = (channel = null, token) => async (dispatch, getState) =>
    await new Promise(async (resolve, reject) => {
        let activePublicChannel = getState().oneChannel
        let authUserId = getState().auth.profile.id
        let usersOfPublicChannel = activePublicChannel.users
        await axios.get(`${BASE_AUTH_URL}get-message-to/${activePublicChannel.id || channel.channel_id}`, getAuthOptions(token))
            .then((res) => {
                switch (activePublicChannel.type) {
                    case 'channel':
                        if (res.status === 200) {
                            dispatch({type: ChatActionTypes.TOGGLE_CHANNEL_MESSAGES, payload: 'publicMessages'})
                            dispatch({type: ChatActionTypes.FETCH_PUBLIC_CHANNEL_MESSAGES, payload: res.data})
                        }
                        if (compareChannelUsers(usersOfPublicChannel, authUserId) !== undefined) {
                            return
                        } else {
                            toast.error('you must join to the channel!', toastOptions('top-right'))
                        }
                        break;
                    default:
                        break;
                }
                resolve()
            })
    })


export const ChannelDmSelectAction = (channel, token) => async (dispatch, getState) =>
    await new Promise(async (resolve, reject) => {
        let activePrivateChannel = getState().onePrivateChannel
        let authUserId = getState().auth.profile.id
        let usersOfPrivateChannel = activePrivateChannel.users
        await axios.get(`${BASE_AUTH_URL}get-message-to/${activePrivateChannel.id || channel.channel_id}`, getAuthOptions(token)).then(res => {
            switch (activePrivateChannel.type) {
                case "dm":
                    if (res.status === 200) {
                        dispatch({type: ChatActionTypes.TOGGLE_CHANNEL_MESSAGES, payload: 'privateMessages'})
                        dispatch({type: ChatActionTypes.FETCH_PRIVATE_CHANNEL_MESSAGES, payload: res.data})
                        if (compareChannelUsers(usersOfPrivateChannel, authUserId) !== undefined) {
                            return
                        } else {
                            toast.error('you must join to the private channel!', toastOptions('top-right'))
                        }
                    }
                    break;
                default:
                    return
            }
        })
        resolve()
    })
