import React, {memo, useEffect} from 'react';
import {ChannelPanel} from "./PublicChannels/ChannelPanel";
import {MessagesPanel} from "./MessagesPanel";
import PropTypes from "prop-types";

export const Dashboard = () => {
    console.log('Dashboard')
    return (
        <div className="pt-lg-5">
            <div className="d-flex justify-content-center min-vw-100">
                <div className="w-25 p-0" style={{minWidth: 200}}>
                    <ChannelPanel />
                </div>
                <MessagesPanel />
            </div>
        </div>
    )
}
