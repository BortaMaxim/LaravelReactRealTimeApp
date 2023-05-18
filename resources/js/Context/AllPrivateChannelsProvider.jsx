import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const AllPrivateChannelsContext = createContext([])
const AllPrivateChannelsProvider = (props) => {
    const privateChannels = useSelector(state => state.getAllPublicChannels.privateChannels)
    return <AllPrivateChannelsContext.Provider value={privateChannels} {...props}/>
}

export default AllPrivateChannelsProvider;
