import * as AuthActionTypes from '../types/authActionTypes'
import axios from 'axios'
import {BASE_AUTH_URL, getAuthOptions, postOptions} from "../utils";


export const RegisterAction = (formData, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}register`, formData, postOptions()).then(res => {
        dispatch({type: AuthActionTypes.REGISTER_SUCCESS, payload: res})
        setTimeout(() => {
            history.push('/login')
        }, 3000)
    }).catch(err => {
        dispatch({type: AuthActionTypes.REGISTER_FAILED, payload: err})
    })
}

export const LoginAction = (formData, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}login`, formData, postOptions()).then(res => {
        if(res.hasOwnProperty('success') && res.success === true) {
            dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: res})
            if (res.data.email_verified_at !== null) {
                console.log(res.data.email_verified_at)
                localStorage.setItem('user-token', res.token)
                localStorage.setItem('email-verified-at', res.data.email_verified_at)
                setTimeout(() => {
                    history.push('/user/profile')
                })
            }

        }else {
            dispatch({type: AuthActionTypes.LOGIN_FAILED, payload: res.message})
        }
    })
}

export const ProfileAction = (token) => async (dispatch) => {
    dispatch({type: AuthActionTypes.IS_FETCHING_PROFILE})
    await axios.get(`${BASE_AUTH_URL}profile`, getAuthOptions(token)).then(res => {
        dispatch({type: AuthActionTypes.PROFILE_FETCHED, payload: res})
    })
}

export const LogoutAction = (token) => async (dispatch) => {
    dispatch({type: AuthActionTypes.IS_LOGGED_OUT})
    await axios.get(`${BASE_AUTH_URL}logout`, getAuthOptions(token)).then(res => {
        dispatch({type: AuthActionTypes.LOGOUT, payload: res})
    })
}

export const ForgotPasswordAction = (formData) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}password/forgot-password`, formData, postOptions()).then(res => {
        dispatch({type: AuthActionTypes.FORGOT_PASSWORD_SUCCESS, payload: res})
    }).catch(err => {
        dispatch({type: AuthActionTypes.FORGOT_PASSWORD_ERROR, payload: err})
    })
}

export const PasswordResetTokenAction = () => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}password-reset-token`).then(res => {
        dispatch({type: AuthActionTypes.PASSWORD_RESET_TOKEN, payload: res})
    })
}
