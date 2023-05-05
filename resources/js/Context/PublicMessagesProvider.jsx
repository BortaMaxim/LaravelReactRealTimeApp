import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const PublicMessagesContext = createContext([])
export const PublicMessagesProvider = (props) => {
    const publicMessages = useSelector(state => state.publicRoomMessages.publicMessages)
    return <PublicMessagesContext.Provider value={publicMessages} {...props}/>
}
