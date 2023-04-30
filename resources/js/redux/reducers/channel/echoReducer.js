import * as ChatActionTypes from '../../types/chatActionTypes'


let initialState = {
    echoData: null
}

export const echoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCH_DATA_FROM_ECHO:
            return {
                ...state,
                echoData: action.payload
            }
        default:
            return state
    }
}
