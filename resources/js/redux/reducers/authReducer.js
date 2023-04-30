import * as AuthActionTypes from '../types/authActionTypes'

let initialState = {
    loading: false,
    isShow: null,
    successResponse: {},
    profile: {},
    passwordResetToken: {},
    errorResponse: {},
    onlineUsers: []
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
        case AuthActionTypes.IS_SHOW:
            return {
                ...state,
                isShow: true
            }
        case AuthActionTypes.IS_HIDE:
            return {
                ...state,
                isShow: false
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
        case AuthActionTypes.LOGIN_WARNING:
            return {
                ...state,
                loading: false,
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
            }
        case AuthActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case AuthActionTypes.FORGOT_PASSWORD_WARNING:
            return {
                ...state,
                loading: false,
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
            }
        case AuthActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case AuthActionTypes.RESET_PASSWORD_WARNING:
            return {
                ...state,
                loading: false,
            }
        case AuthActionTypes.RESET_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errorResponse: action.payload
            }
        case AuthActionTypes.ONLINE_CHAT_USERS:
            return {
                ...state,
                onlineUsers: action.payload
            }
        case AuthActionTypes.REMOVE_USER_AFTER_LOGGED_OUT:
            let authUser = state.onlineUsers.filter((user) => user.id !== action.payload.id)
            return {
                ...state,
                onlineUsers: authUser
            }
        default:
            return state
    }
}
