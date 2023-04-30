import React, {memo, useEffect} from 'react';
import {useSelector} from "react-redux";
import {PublicMessagesContainer} from "./PublicMessagesContainer";
import {PrivateMessagesContainer} from "./PrivateMessagesContainer";
import {UserMessagesContainer} from "./UserMessagesContainer";

export const MessageContainer = (props) => {
    const {
        userMessages,
        publicMessages,
        privateMessages,
        profile,
        messagesEnd,
        activeUserId,
        publicChannel,
        privateChannel
    } = props
    const channelsType = useSelector(state => state.toggleMessages)
    // const publicMessages = useSelector(state => state.publicRoomMessages.publicMessages)

    return (
        <>
            {
                channelsType === 'userChannel' && channelsType !== '' &&
                <UserMessagesContainer
                    userMessages={userMessages}
                    activeUserId={activeUserId}
                    profile={profile}
                    messagesEnd={messagesEnd}
                />
            }
            {
                channelsType === 'publicMessages' && channelsType !== '' &&
                <PublicMessagesContainer
                    publicMessages={publicMessages}
                    profile={profile}
                    messagesEnd={messagesEnd}
                    publicChannel={publicChannel}
                />
            }
            {
                channelsType === 'privateMessages' && channelsType !== '' &&
                <PrivateMessagesContainer
                    privateMessages={privateMessages}
                    privateChannel={privateChannel}
                    profile={profile}
                    messagesEnd={messagesEnd}/>
            }
        </>
    )
}
