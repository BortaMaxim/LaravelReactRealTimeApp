import * as ChannelActionTypes from '../../types/channelActionTypes'

export const getAllChannelsReducer = (state = [], action) => {
    switch (action.type) {
        case ChannelActionTypes.GET_ALL_CHANNELS:
            return action.payload

        case ChannelActionTypes.DELETE_CHANNEL_SUCCESS:
            return state.filter((el) => el.id !== action.id)

        default:
            return state
    }
}
