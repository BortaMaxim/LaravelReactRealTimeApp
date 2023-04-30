import * as ChatActionTypes from '../../../types/chatActionTypes'

let initialState = {
    publicMessages: [],
}

export const publicMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_PUBLIC_CHANNEL_MESSAGES:
            return {
                ...state,
                publicMessages: action.payload
            }
        case ChatActionTypes.ADD_PUBLIC_MESSAGE:
            return {
                ...state,
                publicMessages: [...state.publicMessages, action.payload]
            }
        default:
            return state
    }
}
