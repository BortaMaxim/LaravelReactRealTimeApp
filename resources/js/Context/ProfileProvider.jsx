import React, {createContext} from 'react';
import {useSelector} from "react-redux";

export const ProfileContext = createContext({})

const ProfileProvider = (props) => {
    const profile = useSelector (state => state.auth.profile)
    return <ProfileContext.Provider value={profile} {...props}/>
}
export default ProfileProvider
