import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const IsLoadingContext = createContext(false)
export const IsLoadingProvider = (props) => {
    const isLoading = useSelector(state => state.chat.loading)
    return <IsLoadingContext.Provider value={isLoading} {...props}/>
}
