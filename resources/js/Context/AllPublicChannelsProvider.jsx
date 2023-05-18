import {createContext} from "react";
import {Provider, useSelector} from "react-redux";

export const AllPublicChannelsContext = createContext([])

export const AllPublicChannelsProvider = (props) => {
    const publicChannels = useSelector(state => state.getAllPublicChannels.publicChannels)
    return <AllPublicChannelsContext.Provider value={publicChannels} {...props}/>
}
