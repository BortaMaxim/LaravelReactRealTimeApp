import React from 'react';
import {RoomsMessage} from "./RoomsMessage";

export const PublicMessages = (props) => {
    const {publicMessages, profile} = props

    return (
        <>
            {
                publicMessages.length !== 0
                && publicMessages.map((el, idx) => <RoomsMessage key={idx} el={el} profile={profile}/>)
            }
        </>
    )
}