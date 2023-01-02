import React from 'react';

export const PrivateChannelPanel = (props) => {
    const {privateChannel, handleOpen} = props
    return (
        <div className="channel_info">
            {
                privateChannel !== null
                && <>
                    <h4
                        className="channel_title"
                        onClick={handleOpen}
                    >
                        {privateChannel.name}
                    </h4>
                </>
            }
        </div>
    )
}
