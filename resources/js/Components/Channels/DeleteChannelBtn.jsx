import React from 'react';

const DeleteChannelBtn = (props) => {
    const {channelId, deleteChannel} = props
    return (
        <>
            <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteChannel(channelId)}
            >
                <i className="fa-solid fa-trash-can" ></i>
            </button>
        </>
    )
};

export default DeleteChannelBtn;
