import React from 'react';
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
        sendMessage,
        sendChannelMessage,
        handleChange,
        message,
        message2,
        activeUserId,
        publicChannel,
        privateChannel
    } = props
    const channelsType = useSelector(state => state.toggleMessages)

    return (
        <>
            {
                channelsType === 'userChannel' && channelsType !== '' &&
                <UserMessagesContainer
                    userMessages={userMessages}
                    sendMessage={sendMessage}
                    message={message}
                    handleChange={handleChange}
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
                    message2={message2}
                    sendChannelMessage={sendChannelMessage}
                    handleChange={handleChange}
                    publicChannel={publicChannel}
                />
            }
            {
                channelsType === 'privateMessages' && channelsType !== '' &&
                <PrivateMessagesContainer
                    privateMessages={privateMessages}
                    message2={message2}
                    sendChannelMessage={sendChannelMessage}
                    handleChange={handleChange}
                    privateChannel={privateChannel}
                    profile={profile}
                    messagesEnd={messagesEnd}/>
            }
        </>
    )
}
