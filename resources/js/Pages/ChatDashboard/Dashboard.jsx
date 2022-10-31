import React from 'react';
import {ChannelPanel} from "./ChannelPanel";
import {MessagesPanel} from "./MessagesPanel";

export const Dashboard = (props) => {
    const {friends, isLoading, conversation, lastMessages, channelMessages, profile, sendMessage, handleChange, fields} = props

    return (
        <div className="pt-lg-5">
            <div className="d-flex justify-content-center min-vw-100">
                <div className="w-25 p-0" style={{minWidth: 200}}>
                    <ChannelPanel
                        friends={friends}
                        isLoading={isLoading}
                        lastMessages={lastMessages}
                        channelMessages={channelMessages}
                    />
                </div>
                <MessagesPanel
                    chatMessages={conversation}
                    profile={profile}
                    sendMessage={sendMessage}
                    handleChange={handleChange}
                    fields={fields}
                />
            </div>
        </div>
    )
}
