import React from 'react';
import {Rooms} from "../Rooms";

export const RoomsContainer = (props) => {
    const {publicChannel, setActiveRoom, roomId, privateRoomId, setPrivateActiveRoom, privateChannels} = props
    return <div>
        <Rooms
            publicChannel={publicChannel}
            setActiveRoom={setActiveRoom}
            roomId={roomId}
            privateRoomId={privateRoomId}
            setPrivateActiveRoom={setPrivateActiveRoom}
        />
    </div>
}
