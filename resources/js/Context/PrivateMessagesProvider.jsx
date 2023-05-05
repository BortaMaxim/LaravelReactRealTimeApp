import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const PrivateMessagesContext = createContext([])

export const PrivateMessagesProvider = (props) => {
    const privateMessages = useSelector(state => state.privateRoomMessages.privateMessages)
    return <PrivateMessagesContext.Provider value={privateMessages} {...props}/>
}
