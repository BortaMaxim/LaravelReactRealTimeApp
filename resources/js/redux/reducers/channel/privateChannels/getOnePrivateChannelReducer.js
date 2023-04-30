import * as ChannelActionTypes from '../../../types/channelActionTypes'


export const getOnePrivateChannelReducer = (state = null, action) => {
    switch (action.type) {
        case ChannelActionTypes.GET_ONE_PRIVATE_CHANNEL:
            return action.channel
        default:
            return state
    }
}
