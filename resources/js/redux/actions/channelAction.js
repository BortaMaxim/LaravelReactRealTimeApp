import * as ChannelActionTypes from '../types/channelActionTypes'
import axios from 'axios'
import {BASE_AUTH_URL, postAuthOptions, getAuthOptions, toastOptions} from '../utils'
import {toast} from 'react-toastify'


export const CreateChannelAction = (formData, token) => async (dispatch, getState) => {
    dispatch({type: ChannelActionTypes.IS_CREATING_CHANNEL})
    await axios.post(`${BASE_AUTH_URL}create-channel`, formData, postAuthOptions(token))
        .then(res => {
            let channels = getState().getAllChannels
            channels.push(res.data)
            dispatch({type: ChannelActionTypes.CHANNEL_CREATED_SUCCESS})
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

export const GetOnePublicChannel = (id, token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}get-channel/${id}`, getAuthOptions(token))
        .then(res => {
            dispatch({type: ChannelActionTypes.GET_ONE_CHANNEL, channel: res.data.data})
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
