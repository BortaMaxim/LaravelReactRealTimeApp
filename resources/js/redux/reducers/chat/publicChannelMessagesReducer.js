import * as ChatActionTypes from '../../types/chatActionTypes'

let initialState = {
    publicMessages: [],
    privateMessages: []
}

export const publicChannelMessagesReducer = (state = initialState, action) => {
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
        default:
            return state
    }
}
