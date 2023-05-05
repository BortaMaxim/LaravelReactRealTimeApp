import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {PrivateChannelContext} from "../../../Context/PrivateChannelProvider";

export const PrivateChannelPanel = (props) => {
    const {handleOpen} = props
    const privateChannel = useContext(PrivateChannelContext)
    return (
        <div className="channel_info">
            {
                privateChannel !== null
                && <>
                    <h4
                        className="channel_title"
                        onClick={handleOpen}
                    >
                        {privateChannel.name}
                    </h4>
                </>
            }
        </div>
    )
}
PrivateChannelPanel.propTypes = {
    handleOpen: PropTypes.func,
}
