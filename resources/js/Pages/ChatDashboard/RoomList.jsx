import React from 'react';
import PropTypes from "prop-types";

export const RoomList = (props) => {
    const {el, setActiveRoom, id} = props

    return (
        <>
            <li
                onClick={() => setActiveRoom(el.id)}
                style={{
                    backgroundColor: el.id === id ? '#84cfc7' : '',
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
    id: PropTypes.any,
}
