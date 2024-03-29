import * as AuthActionTypes from '../../types/authActionTypes'
import * as ProfileActionTypes from '../../types/profileActionTypes'
import {toast} from 'react-toastify'
import axios from 'axios'
import {BASE_AUTH_URL, getAuthOptions, getOptions, postOptions, toastOptions, uploadAuthOptions} from "../../utils";
import {initNotificationAndEventChannels} from "../echo/echoActions";

export const ShowNotificationAction = () => {
    return {
        type: AuthActionTypes.IS_SHOW
    }
}

export const HideNotificationAction = () => {
    return {
        type: AuthActionTypes.IS_HIDE
    }
}

export const RegisterAction = (formData, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}registration`, formData, postOptions()).then(res => {
        dispatch({type: AuthActionTypes.REGISTER_SUCCESS, payload: res})
        toast.success(res.data.message, toastOptions('top-center'))
        setTimeout(() => {
            history.push('/login')
        }, 5000)
    }).catch(err => {
        dispatch({type: AuthActionTypes.REGISTER_FAILED, payload: err.response})
        dispatch(ShowNotificationAction())
        setTimeout(() => {
            dispatch(HideNotificationAction())
        }, 3000)
    })
}

export const LoginAction = (formData, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}login`, formData, postOptions()).then(res => {
        if (res.data.hasOwnProperty('success') && res.data.success === true) {
            dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: res.data})
            localStorage.setItem('user-token', res.data.token)
            localStorage.setItem('email-verified-at', res.data.data.email_verified_at)
            toast.success(res.data.message, toastOptions('top-right'))
            setTimeout(() => {
                history.push('/chat')
            }, 4000)
        } else {
            dispatch({type: AuthActionTypes.LOGIN_WARNING, payload: res.data})
            toast.warning(res.data.message, toastOptions('top-right'))
        }
    }).catch(err => {
        dispatch({type: AuthActionTypes.LOGIN_FAILED, payload: err.response})
        dispatch(ShowNotificationAction())
        setTimeout(() => {
            dispatch(HideNotificationAction())
        }, 3000)
    })
}

export const ProfileAction = (token) => async (dispatch, getState) =>
    await new Promise(async (resolve, reject) => {
        dispatch({type: AuthActionTypes.IS_FETCHING_PROFILE})
        await axios.get(`${BASE_AUTH_URL}profile`, getAuthOptions(token)).then(res => {
            dispatch({type: AuthActionTypes.PROFILE_FETCHED, payload: res.data})
            dispatch(initNotificationAndEventChannels(res.data, token))
            // dispatch(OnlineChatUsersAction(token))
            resolve()
        })
    })

export const OnlineChatUsersAction = (modify = null) => async (dispatch) => {
    if (modify === true) {
        await axios.get(`${BASE_AUTH_URL}online-chat-users`, getOptions()).then((res) => {
            dispatch({type: AuthActionTypes.ONLINE_CHAT_USERS, payload: res.data.online_users})
        })
    } else {
        // dispatch(EchoOnlineChatUsers(token))
    }
}

export const RemoveOnlineUserAfterLoggedOutAction = (user) => (dispatch) => {
    console.log('RemoveOnlineUserAfterLoggedOutAction')
    dispatch({type: AuthActionTypes.REMOVE_USER_AFTER_LOGGED_OUT, payload: user})
}

export const LogoutAction = (token, history) => async (dispatch) => {
    dispatch({type: AuthActionTypes.IS_LOGGED_OUT})
    await axios.get(`${BASE_AUTH_URL}logout`, getAuthOptions(token)).then(res => {
        if (res.data.hasOwnProperty('success') && res.data.success === true) {
            dispatch({type: AuthActionTypes.LOGOUT})
            toast.success(res.data.message, toastOptions('top-center'))
            localStorage.clear()
            history.push('/login')
        }
    })
}

export const PasswordResetTokenAction = () => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}password-reset-token`).then(res => {
        dispatch({type: AuthActionTypes.PASSWORD_RESET_TOKEN})
        localStorage.setItem('reset-token', res.data)
    })
}

export const ForgotPasswordAction = (formData) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}password/forgot-password`, formData, postOptions()).then(res => {
        if (res.data.hasOwnProperty('success') && res.data.success === true) {
            dispatch({type: AuthActionTypes.FORGOT_PASSWORD_SUCCESS})
            toast.success(res.data.message, toastOptions('top-center'))
        } else if (res.data.hasOwnProperty('success') && res.data.success === false) {
            dispatch({type: AuthActionTypes.FORGOT_PASSWORD_WARNING})
            toast.error(res.data.message, toastOptions('top-center'))
        }
    }).catch(err => {
        dispatch({type: AuthActionTypes.FORGOT_PASSWORD_ERROR, payload: err.response})
        dispatch(ShowNotificationAction())
        setTimeout(() => {
            dispatch(HideNotificationAction())
        }, 3000)
    })
}

export const ResetPasswordAction = (formData) => async (dispatch) => {
    dispatch({type: AuthActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}update-password`, formData, postOptions()).then(res => {
        if (res.data.success === true) {
            dispatch({type: AuthActionTypes.RESET_PASSWORD_SUCCESS})
            toast.success(res.data.message, toastOptions('top-center'))
        } else {
            dispatch({type: AuthActionTypes.RESET_PASSWORD_WARNING})
            toast.warning(res.data.message, toastOptions('top-center'))
        }
        dispatch(ShowNotificationAction())
        setTimeout(() => {
            dispatch(HideNotificationAction())
        }, 3000)
    }).catch(err => {
        console.log('catch')
        dispatch({
            type: AuthActionTypes.RESET_PASSWORD_ERROR,
            payload: err.response
        })
        dispatch(ShowNotificationAction())
        setTimeout(() => {
            dispatch(HideNotificationAction())
        }, 3000)
    })
}

export const UpdateProfileAction = (formData, token) => async (dispatch) => {
    dispatch({type: ProfileActionTypes.LOADING})
    await axios.post(`${BASE_AUTH_URL}profile/update`, formData, uploadAuthOptions(token)).then(res => {
        dispatch({type: ProfileActionTypes.UPDATED_PROFILE_SUCCESS, payload: res.data})
        toast.success(res.data.message, toastOptions('top-center'))
    }).catch(err => {
        dispatch({type: ProfileActionTypes.UPDATED_PROFILE_FAILED, payload: err.response})
        dispatch(ShowNotificationAction())
        setTimeout(() => {
            dispatch(HideNotificationAction())
        }, 3000)
    })
}

export const MarkAsReadNotificationsAction = (token) => async (dispatch) => {
    await axios.get(`${BASE_AUTH_URL}mark-as-read`, getAuthOptions(token))
        .then(() => {
            dispatch({type: AuthActionTypes.MARK_AS_READ_NOTIFICATIONS})
        })
}

export const DeleteNotificationAction = (id, token) => async (dispatch) => {
    await axios.delete(`${BASE_AUTH_URL}delete-notification/${id}`, getAuthOptions(token))
        .then(res => {
            dispatch({type: AuthActionTypes.DELETE_NOTIFICATION, id})
            toast.success(res.data, toastOptions('top-right'))
        })
}

