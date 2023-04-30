import * as ChatActionTypes from '../../../types/chatActionTypes'

const initialState = {
    loading: false,
    friends: [],
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.IS_FETCHING_FRIENDS:
            return {
                ...state,
                loading: true
            }
        case ChatActionTypes.FETCH_FRIENDS:
            return {
                ...state,
                friends: action.payload,
                loading: false
            }
        default:
            return state
    }
}
