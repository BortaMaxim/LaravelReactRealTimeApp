import React from 'react';

const JoinToChannelBtn = (props) => {
    const {joinToChannel, channelId, setOpen, ownerId, type} = props

    return (
        <>
            <button
                className="btn btn-outline-success"
                onClick={(e) => joinToChannel(e,channelId, ownerId, type, setOpen)}
            >
                join
                &nbsp;
                <i className="fa-solid fa-right-to-bracket"></i>
            </button>
        </>
    )
}

export default JoinToChannelBtn;
