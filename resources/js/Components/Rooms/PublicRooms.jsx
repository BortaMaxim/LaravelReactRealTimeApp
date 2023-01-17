import React from 'react';
import {RoomList} from "../../Pages/ChatDashboard/RoomList";
import PropTypes from "prop-types";

export const PublicRooms = (props) => {
    const {publicChannels, setActiveRoom, roomId} = props

    return (
       <div>
           {
               publicChannels.length !== 0
                   ? <div className="channel">
                       {
                           publicChannels.map(el => (
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
    publicChannels: PropTypes.any,
    roomId: PropTypes.any,
    setActiveRoom: PropTypes.func.isRequired,
}
