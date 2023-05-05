import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {PublicChannelContext} from "../../../Context/PublicChannelProvider";

export const PublicChannelPanel = (props) => {

    const {handleOpen} = props
    const publicChannel = useContext(PublicChannelContext)
    return (
        <div className="channel_info">
            {
                publicChannel !== null
                && <>
                    <h4
                        className="channel_title"
                        onClick={handleOpen}
                    >
                        {publicChannel.name}
                    </h4>
                </>
            }
        </div>
    )
}
PublicChannelPanel.propTypes = {
    handleOpen: PropTypes.func.isRequired,
}
