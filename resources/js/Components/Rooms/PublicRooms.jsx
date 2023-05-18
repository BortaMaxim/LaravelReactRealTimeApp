import React, {useContext} from 'react';
import {RoomList} from "../../Pages/ChatDashboard/RoomList";
import PropTypes from "prop-types";
import {AllPublicChannelsContext} from "../../Context/AllPublicChannelsProvider";

export const PublicRooms = (props) => {
    const {publicChannel, setActiveRoom, roomId} = props
    const publicChannels = useContext(AllPublicChannelsContext)
    return (
       <div>
           {
               publicChannels.length !== 0
                   ? <div className="channel">
                       {
                           publicChannels.map(el => (
                               <RoomList
                                   key={el.id.toString()}
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
