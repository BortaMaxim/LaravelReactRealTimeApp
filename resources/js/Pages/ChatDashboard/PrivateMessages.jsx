import React from 'react';
import {RoomsMessage} from "./RoomsMessage";

export const PrivateMessages = (props) => {
    const {privateMessages} = props
    return (
        <>
            {
                privateMessages !== 0
                && privateMessages.map((el, idx) => <RoomsMessage key={idx.toString()} el={el}/>)
            }
        </>
    )
}
