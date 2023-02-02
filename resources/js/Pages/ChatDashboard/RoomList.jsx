import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

export const RoomList = (props) => {
    const {el, setActiveRoom, roomId} = props
    return (
        <>
            <li
                onClick={() => setActiveRoom(el)}
                style={{
                    backgroundColor: el.id === roomId ? '#84cfc7' : '',
                    cursor: 'pointer'
                }}
                className="list-group-item list-group-item-secondary p-2 mt-2 rounded-1 overflow-hidden"
            >
                {el.name}
            </li>
        </>
    )
}

RoomList.propTypes = {
    el: PropTypes.object,
    setActiveRoom: PropTypes.func.isRequired,
    roomId: PropTypes.any,
}
