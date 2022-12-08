import React from 'react';
import {RoomList} from "../../Pages/ChatDashboard/RoomList";

export const PublicRooms = (props) => {
    const {channels, setActiveRoom, id} = props
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
                                   id={id}
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
