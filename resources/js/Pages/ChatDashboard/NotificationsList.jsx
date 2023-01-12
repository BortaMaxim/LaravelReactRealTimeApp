import React from 'react';
import {NotificationsListItem} from "./NotificationsListItem";
import PropTypes from "prop-types";

export const NotificationsList = (props) => {
    const {notifications, profile, deleteNotification, showNotificationDetails, accentInvite} = props

    return (
        <div className="public_channel_details_users_wrapper">
            {
                notifications.length !== 0
                ? notifications.map(el => (
                        <NotificationsListItem
                            deleteNotification={deleteNotification}
                            showNotificationDetails={showNotificationDetails}
                            accentInvite={accentInvite}
                            profile={profile}
                            key={el.id}
                            el={el}
                        />
                    ))
                : <h5 className="text-danger">empty...</h5>
            }
        </div>
    )
}
NotificationsList.propTypes = {
    notifications: PropTypes.array,
    profile: PropTypes.object,
    deleteNotification: PropTypes.func.isRequired,
    showNotificationDetails: PropTypes.func.isRequired,
}
