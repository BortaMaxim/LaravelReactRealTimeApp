import * as ChatActionTypes from '../../../types/chatActionTypes'
import * as AuthActionTypes from '../../../types/authActionTypes'

let initialState = {
    notifications: [],
    details: {},
    unread_count: 0
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ChatActionTypes.FETCHED_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: action.payload,
                unread_count: action.count
            }
        case ChatActionTypes.GET_ONE_NOTIFICATION:
            return {
                ...state,
                details: action.payload
            }
        case ChatActionTypes.REALTIME_NOTIFICATIONS:
            return {
                ...state,
                unread_count: state.unread_count + 1,
                notifications: [...state.notifications, action.payload]
            }
        case AuthActionTypes.MARK_AS_READ_NOTIFICATIONS:
            return {
                ...state,
                unread_count: 0
            }
        case AuthActionTypes.DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter((el) => el.id !== action.id)
            }
        default:
            return state
    }
}
