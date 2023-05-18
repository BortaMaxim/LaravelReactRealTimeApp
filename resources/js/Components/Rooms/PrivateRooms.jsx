import React, {useContext} from 'react';
import {PrivateRoomList} from "../../Pages/ChatDashboard/PrivateChannels/PrivateRoomList";
import PropTypes from "prop-types";
import {AllPrivateChannelsContext} from "../../Context/AllPrivateChannelsProvider";

export const PrivateRooms = (props) => {
    const {privateRoomId, setPrivateActiveRoom} = props
    const privateChannels = useContext(AllPrivateChannelsContext)
    return (
        <div>
            {
                privateChannels.length !== 0
                    ? <div className="channel">
                        {
                            privateChannels.map(el => (
                                <PrivateRoomList
                                    key={el.id} el={el}
                                    setPrivateActiveRoom={setPrivateActiveRoom}
                                    privateRoomId={privateRoomId}
                                />
                            ))
                        }
                    </div>
                    : <span className="text-danger">no channels...</span>
            }
        </div>
    )
}
PrivateRooms.propTypes = {
    privateChannels: PropTypes.array,
    privateRoomId: PropTypes.any,
    setPrivateActiveRoom: PropTypes.func.isRequired,
}
