import * as ChatActionTypes from '../../../types/chatActionTypes'


export const messageReducer = (state = '', action) => {
    switch (action.type) {
        case ChatActionTypes.SET_MESSAGE:
            return action.payload
        default:
            return state
    }
}
