import React from 'react';
import {NotificationsListItem} from "./NotificationsListItem";

export const NotificationsList = (props) => {
    const {notifications, profile, deleteNotification, showNotificationDetails} = props

    return (
        <div className="public_channel_details_users_wrapper">
            {
                notifications.length !== 0
                ? notifications.map(el => (
                        <NotificationsListItem
                            deleteNotification={deleteNotification}
                            showNotificationDetails={showNotificationDetails}
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
