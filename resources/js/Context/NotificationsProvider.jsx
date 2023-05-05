import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const NotificationsContext = createContext([])
const NotificationsProvider = (props) => {
    const notifications = useSelector(state => state.notifications.notifications)
    return (
        <NotificationsContext.Provider value={notifications} {...props}/>
    )
}

export default NotificationsProvider;
