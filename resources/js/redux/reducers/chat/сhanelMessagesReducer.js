import * as ChatActionTypes from '../../types/chatActionTypes'

let initialState = {
    publicMessages: [],
    privateMessages: []
}

export const chanelMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_PUBLIC_CHANNEL_MESSAGES:
            return {
                ...state,
                publicMessages: action.payload
            }
        case ChatActionTypes.FETCH_PRIVATE_CHANNEL_MESSAGES:
            return {
                ...state,
                privateMessages: action.payload
            }
        case ChatActionTypes.SENT_PUBLIC_CHANNEL_MESSAGE:
            return {
                ...state,
                publicMessages: [...state.publicMessages, action.payload]
            }
        case ChatActionTypes.SENT_PRIVATE_CHANNEL_MESSAGE:
            return {
                ...state,
                privateMessages: [...state.privateMessages, action.payload]
            }
        default:
            return state
    }
}
