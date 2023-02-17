import React from 'react';
import PropTypes from "prop-types";
import {MessageContainer} from "./ContainersComponent/MessageContainer";

export const MessagesPanel = (props) => {
    const {
        chatMessages,
        profile,
        sendMessage,
        handleChange,
        message,
        message2,
        activeUserId,
        messagesEnd,
        publicMessages,
        privateMessages,
        sendChannelMessage,
        recipient,
        publicChannel,
        privateChannel
    } = props

    return (
        <>
            <div className="p-2 w-100">
                <MessageContainer
                    message={message}
                    message2={message2}
                    activeUserId={activeUserId}
                    userMessages={chatMessages}
                    publicMessages={publicMessages}
                    privateMessages={privateMessages}
                    profile={profile}
                    sendMessage={sendMessage}
                    sendChannelMessage={sendChannelMessage}
                    handleChange={handleChange}
                    messagesEnd={messagesEnd}
                    publicChannel={publicChannel}
                    privateChannel={privateChannel}
                />
            </div>
        </>
    )
}

MessagesPanel.propTypes = {
    chatMessages: PropTypes.array,
    profile: PropTypes.object,
    sendMessage: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    fields: PropTypes.string,
    activeUserId: PropTypes.number,
    messagesEnd: PropTypes.object,
    recipient: PropTypes.object,
}
