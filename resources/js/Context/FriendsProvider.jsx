import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const FriendsContext = createContext([])
const FriendsProvider = (props) => {
    const friends = useSelector(state => state.chat.friends)
    return(
        <FriendsContext.Provider value={friends} {...props}/>
    )
}

export default FriendsProvider;
