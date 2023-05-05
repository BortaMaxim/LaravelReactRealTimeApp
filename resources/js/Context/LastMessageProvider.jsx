import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const LastMessageContext = createContext({})
export const LastMessageProvider = (props) => {
    const lastMessage = useSelector(state => state.lastMessages)
    return (
        <LastMessageContext.Provider value={lastMessage} {...props}/>
    )
}
