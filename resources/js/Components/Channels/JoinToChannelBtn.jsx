import React from 'react';

const JoinToChannelBtn = (props) => {
    const {joinToPublicChannel, channelId, setOpen} = props
    return (
        <>
            <button
                className="btn btn-outline-success"
                onClick={(e) => joinToPublicChannel(e,channelId, setOpen)}
            >
                join
                &nbsp;
                <i className="fa-solid fa-right-to-bracket"></i>
            </button>
        </>
    )
}

export default JoinToChannelBtn;
