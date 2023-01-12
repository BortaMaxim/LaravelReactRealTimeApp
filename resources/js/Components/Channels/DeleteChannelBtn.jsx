import React from 'react';
import PropTypes from "prop-types";

const DeleteChannelBtn = (props) => {
    const {channelId, deleteChannel} = props
    return (
        <>
            <button
                className="btn btn-outline-danger"
                onClick={() => deleteChannel(channelId)}
            >
                <i className="fa-solid fa-trash-can" ></i>
            </button>
        </>
    )
};

DeleteChannelBtn.propTypes = {
    channelId: PropTypes.number,
    deleteChannel: PropTypes.func.isRequired,
}

export default DeleteChannelBtn;
