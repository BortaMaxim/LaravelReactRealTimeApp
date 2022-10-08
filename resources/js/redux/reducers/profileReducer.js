import * as ProfileActionTypes from '../types/profileActionTypes'

const initialState = {
    loading: false,
    validation: {},
    profileUpdated: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProfileActionTypes.LOADING:
            return {
                ...state,
                loading: true
            }
        case ProfileActionTypes.UPDATED_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileUpdated: action.payload
            }
        case ProfileActionTypes.UPDATED_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                validation: action.payload
            }
        default:
            return state
    }
}
