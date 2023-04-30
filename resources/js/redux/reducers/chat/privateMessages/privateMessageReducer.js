import * as ChatActionTypes from '../../../types/chatActionTypes'


export const privateMessageReducer = (state = '', action) => {
    switch (action.type) {
        case ChatActionTypes.SET_PRIVATE_MESSAGE:
            return action.payload
        default:
            return state
    }
}
