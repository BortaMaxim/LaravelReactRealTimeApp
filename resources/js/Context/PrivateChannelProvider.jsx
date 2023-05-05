import React, {createContext} from "react";
import {useSelector} from "react-redux";

export const PrivateChannelContext = createContext(null)

const PrivateChannelProvider = (props) => {
    const privateChannel = useSelector(state => state.onePrivateChannel)
    return <PrivateChannelContext.Provider value={privateChannel} {...props}/>
}

export default PrivateChannelProvider;
