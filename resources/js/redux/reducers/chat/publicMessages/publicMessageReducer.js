import * as ChatActionTypes from '../../../types/chatActionTypes'


export const publicMessageReducer = (state = '', action) => {
    switch (action.type) {
        case ChatActionTypes.SET_PUBLIC_MESSAGE:
            return action.payload
        default:
            return state
    }
}
