import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const ConversationContext = createContext([])
export  const ConversationProvider = (props) => {
    const conversation = useSelector(state => state.conversation)
    return (
        <ConversationContext.Provider  value={conversation} {...props}/>
    )
}
