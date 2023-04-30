import React from 'react';
import {Message} from "./Message";

export const UserMessages = (props) => {
    const {userMessages, profile} = props
    return (
        <>
            {
                userMessages.length !== 0
                && <>
                    {
                        userMessages.map((el, idx) => <Message key={idx.toString()} el={el} profile={profile}/>)
                    }
                </>
            }
        </>
    )
}
