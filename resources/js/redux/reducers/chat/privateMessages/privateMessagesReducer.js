import * as ChatActionTypes from '../../../types/chatActionTypes'

let initialState = {
    privateMessages: []
}

export const privateMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_PRIVATE_CHANNEL_MESSAGES:
            return {
                ...state,
                privateMessages: action.payload
            }
        case ChatActionTypes.ADD_PRIVATE_MESSAGE:
            return {
                ...state,
                privateMessages: [...state.privateMessages, action.payload]
            }
        default:
            return state
    }
}
