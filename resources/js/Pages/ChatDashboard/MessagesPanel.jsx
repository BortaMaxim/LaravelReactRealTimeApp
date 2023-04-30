import React from 'react';
import PropTypes from "prop-types";
import {MessageContainer} from "./ContainersComponent/MessageContainer";

export const MessagesPanel = (props) => {
    const {
        chatMessages,
        profile,
        activeUserId,
        messagesEnd,
        publicMessages,
        privateMessages,
        recipient,
        publicChannel,
        privateChannel
    } = props

    return (
        <>
            <div className="p-2 w-100">
                <MessageContainer
                    activeUserId={activeUserId}
                    userMessages={chatMessages}
                    publicMessages={publicMessages}
                    privateMessages={privateMessages}
                    profile={profile}
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
    fields: PropTypes.string,
    activeUserId: PropTypes.number,
    messagesEnd: PropTypes.object,
    recipient: PropTypes.object,
}
