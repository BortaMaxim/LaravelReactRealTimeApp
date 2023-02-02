import React from 'react';
import {UserMessages} from "../UserMessages";
import {PublicMessages} from "../PublicMessages";
import {useSelector} from "react-redux";
import {PrivateMessages} from "../PrivateMessages";

export const MessageContainer = (props) => {
    const {userMessages, publicMessages, privateMessages, profile} = props
    const channelsType = useSelector(state => state.toggleMessages)

    return (
        <>
            {channelsType === 'userChannel' && channelsType !== '' && <UserMessages userMessages={userMessages} profile={profile}/>}
            {channelsType === 'publicMessages' && channelsType !== '' && <PublicMessages publicMessages={publicMessages} profile={profile}/>}
            {channelsType === 'privateMessages' && channelsType !== '' && <PrivateMessages privateMessages={privateMessages} profile={profile}/>}
        </>
    )
}
