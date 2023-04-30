import * as ChatActionTypes from '../../../types/chatActionTypes'


export const lastMessagesReducer = (state = {}, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_LAST_MESSAGES:
            return action.payload
        case ChatActionTypes.FETCH_LAST_MESSAGE_WITH:
            let newState = {...state}
            newState[action.payload.id] = action.payload.message
            return newState
        default:
            return state
    }
}
