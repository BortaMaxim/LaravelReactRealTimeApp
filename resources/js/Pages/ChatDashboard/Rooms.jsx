import React from 'react';
import PropTypes from "prop-types";
import {PublicRooms} from "../../Components/Rooms/PublicRooms";
import {useOpen} from "../../hooks/useOpen";


export const Rooms = (props) => {
    const {channels, setActiveRoom, id} = props
    const {openPublic, handlePublicToggle} = useOpen()
    return (
        <div>
            <h1 className="text-light">Rooms:</h1>
            <button className="btn btn-primary" onClick={handlePublicToggle}>
                Public rooms {openPublic === true ? <span>&#8963;</span> : <span>&#8964;</span>}
            </button>
            {
                openPublic === true
                && <PublicRooms
                    channels={channels}
                    setActiveRoom={setActiveRoom}
                    id={id}
                />
            }

        </div>
    )
}

Rooms.propTypes = {
    channels: PropTypes.array.isRequired,
    setActiveRoom: PropTypes.func.isRequired,
    id: PropTypes.any,
}
