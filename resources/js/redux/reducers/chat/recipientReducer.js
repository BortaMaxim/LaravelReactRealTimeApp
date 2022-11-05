import * as ChatActionTypes from '../../types/chatActionTypes'

export const recipientReducer = (state = {}, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_RECIPIENT:
            return action.payload
        default:
            return state
    }
}
