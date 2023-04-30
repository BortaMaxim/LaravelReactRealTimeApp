import * as ChatActionTypes from '../../../types/chatActionTypes'


export const unreadMessagesCountReducer = (state = 0, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_UNREAD_MESSAGES_COUNT:
            return action.payload
        default:
            return state
    }
}
