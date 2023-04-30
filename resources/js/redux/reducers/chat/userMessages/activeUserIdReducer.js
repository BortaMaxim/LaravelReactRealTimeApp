import * as ChatActionTypes from '../../../types/chatActionTypes'


export const activeUserIdReducer = (state = 0, action) => {
    switch (action.type) {
        case ChatActionTypes.SET_ACTIVE_USER_ID:
            return action.payload
        default:
            return state
    }
}
