import React from 'react';
import PropTypes from "prop-types";

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
JoinToChannelBtn.propTypes = {
    joinToChannel: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    channelId: PropTypes.number,
    ownerId: PropTypes.number,
    type: PropTypes.string,
}

export default JoinToChannelBtn;
