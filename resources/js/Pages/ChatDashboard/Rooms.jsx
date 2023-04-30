import React from 'react';
import PropTypes from "prop-types";
import {PublicRooms} from "../../Components/Rooms/PublicRooms";
import {useChannelPannelOpen} from "../../hooks/useChannelPannelOpen";
import {PrivateRooms} from "../../Components/Rooms/PrivateRooms";


export const Rooms = (props) => {
    const {publicChannels, publicChannel, privateChannels, setActiveRoom, roomId, privateRoomId, setPrivateActiveRoom} = props
    const {openPublic, openPrivate, handlePrivateToggle, handlePublicToggle} = useChannelPannelOpen()

    return (
        <div>
            <h1 className="text-light">Rooms:</h1>
            <button className="btn btn-primary" onClick={handlePublicToggle}>
                Public rooms {openPublic === true ? <span>&#8963;</span> : <span>&#8964;</span>}
            </button>
            {
                openPublic === true
                && <PublicRooms
                    publicChannels={publicChannels}
                    publicChannel={publicChannel}
                    setActiveRoom={setActiveRoom}
                    roomId={roomId}
                />
            }
            <button className="btn btn-primary" onClick={handlePrivateToggle}>
                Private rooms {openPrivate === true ? <span>&#8963;</span> : <span>&#8964;</span>}
            </button>
            {
                openPrivate  === true
                && <PrivateRooms
                    setPrivateActiveRoom={setPrivateActiveRoom}
                    privateRoomId={privateRoomId}
                    privateChannels={privateChannels}
                />
            }
        </div>
    )
}

Rooms.propTypes = {
    publicChannels: PropTypes.any,
    setActiveRoom: PropTypes.func.isRequired,
    roomId: PropTypes.any,
}
