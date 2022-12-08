import React from 'react';
import DeleteChannelBtn from "../../Components/Channels/DeleteChannelBtn";

export const PublicChannelPanel = (props) => {
    const {publicChannel, handleOpen, deleteChannel, profile} = props
    const compairedOwnerId = publicChannel.owner_id === profile.id

    return (
        <div className="channel_info">
            <h4
                className="channel_title"
                onClick={handleOpen}
            >
                {publicChannel.name}
            </h4>
            {
                compairedOwnerId
                    ? <DeleteChannelBtn
                        channelId={publicChannel.id}
                        deleteChannel={deleteChannel}
                    />
                    : null
            }

        </div>
    )
}
