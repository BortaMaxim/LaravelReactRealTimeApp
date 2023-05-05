import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const ActiveUserIdContext = createContext(0)
export const ActiveUserIdProvider = (props) => {
    const activeUserId = useSelector(state => state.activeUserId)
    return (
        <ActiveUserIdContext.Provider value={activeUserId} {...props}/>
    )
}
