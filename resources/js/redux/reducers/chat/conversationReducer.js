import * as ChatActionTypes from '../../types/chatActionTypes'


export const conversationReducer = (state = [], action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_CONVERSATION_WITH:
            return action.payload
        case ChatActionTypes.ADD_LOCAL_MSG_TO_CONVERSATION:
            state.push({message: action.payload})
            return state
        default:
            return state
    }
}
