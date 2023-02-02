import * as ChatActionTypes from '../../types/chatActionTypes'

export const toggleChannelMessagesReducer = (state = '', action) => {
    switch (action.type) {
        case ChatActionTypes.TOGGLE_CHANNEL_MESSAGES:
            return action.payload
        default:
            return state
    }
}
