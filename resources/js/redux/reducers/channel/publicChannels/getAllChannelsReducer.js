import * as ChannelActionTypes from '../../../types/channelActionTypes'

let initialState = {
    loading: false,
    publicChannels: [],
    privateChannels: [],
    createChannelExeption: {},
}
export const getAllChannelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChannelActionTypes.IS_CREATING_CHANNEL:
            return {
                ...state,
                loading: true
            }
        case ChannelActionTypes.GET_ALL_CHANNELS:
            return {
                ...state,
                publicChannels: action.payload
            }
        case ChannelActionTypes.GET_ALL_PRIVATE_CHANNELS:
            return {
                ...state,
                privateChannels: action.payload
            }
        case ChannelActionTypes.DELETE_CHANNEL_SUCCESS:
            return {
                ...state,
                publicChannels: state.publicChannels.filter((el) => el.id !== action.id)
            }
        case ChannelActionTypes.DELETE_PRIVATE_CHANNEL_SUCCESS:
            return {
                ...state,
                privateChannels: state.privateChannels.filter((el) => el.id !== action.id)
            }
        case ChannelActionTypes.CHANNEL_CREATED_SUCCESS:
            return {
                ...state,
                loading: false,
                publicChannels: [...state.publicChannels, action.payload]
            }
        case ChannelActionTypes.CHANNEL_CREATED_ERROR:
            return {
                ...state,
                loading: false,
                createChannelExeption: action.payload
            }
        case ChannelActionTypes.CREATE_PRIVATE_CHANNEL:
            return {
                ...state,
                loading: false,
                privateChannels: [...state.privateChannels, action.payload]
            }
        default:
            return state
    }
}
