import * as ChannelsActionTypes from '../../types/channelActionTypes'


export const modifiedChannelReducer = (state = null, action) => {
    switch (action.type) {
        case ChannelsActionTypes.MODIFIED_AFTER_DELETE_CHANNEL:
            return action.payload
        default:
            return state
    }
}
