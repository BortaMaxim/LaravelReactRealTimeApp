import React from 'react';
import {Notifications} from "../Notifications";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../../hooks/useModal";
import NotificationModal from '../../../Components/Details/Modal'
import {NotificationsList} from "../NotificationsList";
import {MarkAsReadNotifications} from "../../../redux/actions/authAction";

export const GetNotificationsContainer = (props) => {
    const {profile} = props
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()

    const {openNotification, setOpenNotification} = useModal()
    const notifications = useSelector(state => ({
        notifications: state.notifications.notifications,
        notifications_count: state.notifications.unread_count,
    }))

    const markAsRead = () => {
        const {notifications_count} = notifications
        setOpenNotification(true)
        if (notifications_count !== 0) {
            dispatch(MarkAsReadNotifications(token))
        }
    }

    return (
        <>
            <Notifications
                openHandler={markAsRead}
                notificationsCount={notifications.notifications_count}
            />
            <NotificationModal
                isOpen={openNotification}
                title="Notifications:"
                handleClose={() => setOpenNotification(false)}
            >
                <NotificationsList
                    profile={profile}
                    notifications={notifications.notifications}/>
            </NotificationModal>
        </>
    )
}
