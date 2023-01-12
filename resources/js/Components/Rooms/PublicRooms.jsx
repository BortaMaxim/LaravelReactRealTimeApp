import React from 'react';
import {RoomList} from "../../Pages/ChatDashboard/RoomList";
import PropTypes from "prop-types";

export const PublicRooms = (props) => {
    const {channels, setActiveRoom, roomId} = props
    return (
       <div>
           {
               channels.length !== 0
                   ? <div className="channel">
                       {
                           channels.map(el => (
                               <RoomList
                                   key={el.id}
                                   el={el}
                                   roomId={roomId}
                                   setActiveRoom={setActiveRoom}
                               />
                           ))
                       }
                   </div>
                   : <span className="text-danger">no channels...</span>
           }
       </div>
    )
}
PublicRooms.propTypes = {
    channels: PropTypes.array,
    roomId: PropTypes.any,
    setActiveRoom: PropTypes.func.isRequired,
}
