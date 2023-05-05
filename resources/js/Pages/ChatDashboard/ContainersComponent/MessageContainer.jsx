import React, {memo, useContext, useEffect} from 'react';
import {useSelector} from "react-redux";
import {PublicMessagesContainer} from "./PublicMessagesContainer";
import {PrivateMessagesContainer} from "./PrivateMessagesContainer";
import {UserMessagesContainer} from "./UserMessagesContainer";
import {MessageEndContext} from "../../../Context/RootContext";

export const MessageContainer = () => {
    const channelsType = useSelector(state => state.toggleMessages)
    const messagesEnd = useContext(MessageEndContext)

    return (
        <>
            {
                channelsType === 'userChannel' && channelsType !== '' &&
                <UserMessagesContainer
                    messagesEnd={messagesEnd}
                />
            }
            {
                channelsType === 'publicMessages' && channelsType !== '' &&
                <PublicMessagesContainer
                    messagesEnd={messagesEnd}
                />
            }
            {
                channelsType === 'privateMessages' && channelsType !== '' &&
                <PrivateMessagesContainer
                    messagesEnd={messagesEnd}/>
            }
        </>
    )
}
