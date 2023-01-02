import React from 'react';
import {Notifications} from "../Notifications";
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../../hooks/useModal";
import NotificationModal from '../../../Components/Details/Modal'
import NotificationDetailsModal from '../../../Components/Details/Modal'
import {NotificationsList} from "../NotificationsList";
import {DeleteNotificationAction, MarkAsReadNotificationsAction} from "../../../redux/actions/authAction";
import {NotificationDetails} from "../../../Components/Notifications/NotificationDetails";
import {GetOneNotificationAction} from "../../../redux/actions/chatAction";

export const GetNotificationsContainer = (props) => {
    const {profile} = props
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()
    const {active, setActive} = useModal()

    const {openNotification, setOpenNotification} = useModal()
    const notifications = useSelector(state => ({
        notifications: state.notifications.notifications,
        notifications_count: state.notifications.unread_count,
        details: state.notifications.details,
    }))

    const showNotificationDetails = (id) => {
        dispatch(GetOneNotificationAction(id, token))
        setActive(true)
    }

    const deleteNotification = (id) => {
        dispatch(DeleteNotificationAction(id, token))
    }

    const markAsRead = () => {
        const {notifications_count} = notifications
        setOpenNotification(true)
        if (notifications_count !== 0) {
            dispatch(MarkAsReadNotificationsAction(token))
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
                    showNotificationDetails={showNotificationDetails}
                    deleteNotification={deleteNotification}
                    notifications={notifications.notifications}/>
            </NotificationModal>
            <NotificationDetailsModal
                isOpen={active}
                title="Details:"
                handleClose={() => setActive(false)}
            >
                <NotificationDetails
                    details={notifications.details}
                />
            </NotificationDetailsModal>
        </>
    )
}
