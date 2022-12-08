import * as ChannelsActionTypes from '../../types/channelActionTypes'


export const getOnePublicChannelReducer = (state = null, action) => {
    switch (action.type) {
        case ChannelsActionTypes.GET_ONE_CHANNEL:
            return action.channel
        default:
            return state
    }
}
