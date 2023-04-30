import React, {useEffect} from 'react';
import {ChannelPanel} from "./PublicChannels/ChannelPanel";
import {MessagesPanel} from "./MessagesPanel";
import PropTypes from "prop-types";

export const Dashboard = (props) => {
    const {
        friends,
        isLoading,
        conversation,
        lastMessages,
        profile,
        activeUserId,
        messagesEnd,
        publicMessages,
        privateMessages,
        publicChannel,
        privateChannel,
        notifications
    } = props

    return (
        <div className="pt-lg-5">
            <div className="d-flex justify-content-center min-vw-100">
                <div className="w-25 p-0" style={{minWidth: 200}}>
                    <ChannelPanel
                        privateChannel={privateChannel}
                        publicChannel={publicChannel}
                        friends={friends}
                        isLoading={isLoading}
                        lastMessages={lastMessages}
                        notifications={notifications}
                    />
                </div>
                <MessagesPanel
                    messagesEnd={messagesEnd}
                    activeUserId={activeUserId}
                    chatMessages={conversation}
                    profile={profile}
                    publicMessages={publicMessages}
                    privateMessages={privateMessages}
                    privateChannel={privateChannel}
                    publicChannel={publicChannel}
                />
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    friends: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    conversation: PropTypes.array,
    lastMessages: PropTypes.object,
    profile: PropTypes.object,
    fields: PropTypes.string,
    activeUserId: PropTypes.number,
    messagesEnd: PropTypes.object,
}
