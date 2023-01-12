import React from 'react';
import PropTypes from "prop-types";

export const PrivateRoomList = (props) => {
     const {el, privateRoomId, setPrivateActiveRoom} = props

    return (
        <div
            style={{
                backgroundColor: el.id === privateRoomId ? '#84cfc7' : '',
                cursor: 'pointer'
            }}
            className="list-group-item list-group-item-secondary p-2 mt-2 rounded-1 overflow-hidden"
            onClick={() => setPrivateActiveRoom(el.id)}
        >
            {el.name}
        </div>
    )
}
PrivateRoomList.propTypes = {
    el: PropTypes.object,
    privateRoomId: PropTypes.any,
    setPrivateActiveRoom: PropTypes.func.isRequired,
}
