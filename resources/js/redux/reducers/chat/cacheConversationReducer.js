import * as ChatActionTypes from '../../types/chatActionTypes'


export const cacheConversationReducer = (state = {}, action) => {
    switch (action.type) {
        case ChatActionTypes.CACHE_CONVERSATION_WITH:
            let newState = {...state}
            newState[action.payload.id] = action.payload.conversation
            return newState
        default:
            return state
    }
}
