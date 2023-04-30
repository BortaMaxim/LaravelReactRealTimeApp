import * as InviteActionTypes from '../../types/inviteActionTypes'
import {BASE_AUTH_URL, getAuthOptions, postAuthOptions, toastOptions} from '../../utils'
import {toast} from "react-toastify";
import axios from "axios";
import {GetAllChannelsAction} from "../channel/channelAction";
import * as ChannelActionTypes from "../../types/channelActionTypes";


export const AcceptInviteAction = (inviteId, requestType, token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}accept-invite/${inviteId}`, getAuthOptions(token))
        .then(res => {
            switch (requestType) {
                case 'INVT':
                    if (res.status === 200) {
                        toast.success(res.data.original, toastOptions('top-right'))
                    }
                    break;
                case 'JOIN':
                    if (res.status === 200) {
                        toast.success(res.data.original, toastOptions('top-right'))
                    }
                    break;
                default:
                    break;
            }
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
