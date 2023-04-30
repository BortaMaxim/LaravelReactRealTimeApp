import React from 'react';
import {Rooms} from "../Rooms";

export const RoomsContainer = (props) => {
    const {publicChannels, publicChannel, setActiveRoom, roomId, privateRoomId, setPrivateActiveRoom, privateChannels} = props
    return <div>
        <Rooms
            publicChannels={publicChannels}
            publicChannel={publicChannel}
            setActiveRoom={setActiveRoom}
            roomId={roomId}
            privateRoomId={privateRoomId}
            setPrivateActiveRoom={setPrivateActiveRoom}
            privateChannels={privateChannels}
        />
    </div>
}
