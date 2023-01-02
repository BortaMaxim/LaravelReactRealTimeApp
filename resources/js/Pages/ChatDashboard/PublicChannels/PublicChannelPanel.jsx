import React from 'react';

export const PublicChannelPanel = (props) => {

    const {publicChannel, handleOpen} = props

    return (
        <div className="channel_info">
            {
                publicChannel !== null
                && <>
                    <h4
                        className="channel_title"
                        onClick={handleOpen}
                    >
                        {publicChannel.name}
                    </h4>
                </>
            }
        </div>
    )
}
