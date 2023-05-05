import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const PublicChannelContext = createContext(null)

const PublicChannelProvider = (props) => {
    const publicChannel = useSelector(state => state.oneChannel)
    return <PublicChannelContext.Provider value={publicChannel} {...props}/>
}

export default PublicChannelProvider;
