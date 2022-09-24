import * as AuthActionTypes from '../types/authActionTypes'

let initialState = {
    loading: false,
    successResponse: {},
    profile: {},
    passwordResetToken: {},
    errorResponse: {},
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.LOADING:
            return {
                ...state,
                loading: true
            }
        case AuthActionTypes.IS_FETCHING_PROFILE:
            return {
                ...state,
                loading: true
            }
        case AuthActionTypes.IS_LOGGED_OUT:
            return {
                ...state,
                loading: true
            }
        case AuthActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case AuthActionTypes.PROFILE_FETCHED:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                successResponse: action.payload
            }
        case AuthActionTypes.FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case AuthActionTypes.PASSWORD_RESET_TOKEN:
            return {
                ...state,
                loading: false,
                passwordResetToken: action.payload
            }
        default: return state
    }
}
