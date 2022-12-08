import * as ChannelActionTypes from '../../types/channelActionTypes'

let initialState = {
    loading: false,
    createChannelExeption: {}
}

export const createChannelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChannelActionTypes.IS_CREATING_CHANNEL:
            return {
                ...state,
                loading: true
            }
        case ChannelActionTypes.CHANNEL_CREATED_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case ChannelActionTypes.CHANNEL_CREATED_ERROR:
            return {
                ...state,
                loading: false,
                createChannelExeption: action.payload
            }
        default:
            return state
    }
}
