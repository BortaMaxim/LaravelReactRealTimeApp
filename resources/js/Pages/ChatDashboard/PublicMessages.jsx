import React, {memo, useEffect} from 'react';
import {RoomsMessage} from "./RoomsMessage";

export const PublicMessages = (props) => {
    const {publicMessages} = props

    return (
        <>
            {
                publicMessages.length !== 0
                && publicMessages.map((el, idx) => <RoomsMessage key={idx.toString()} el={el}/>)
            }
        </>
    )
}
