import React from 'react';
import {URL} from "../../redux/utils";
import PropTypes from "prop-types";


export const MessagePanelHeader = (props) => {
    const {recipient} = props
    return (
        <div className="message_header">
            <img className="message_header_avatar" src={`${URL}/avatars/${recipient.avatar}`}
                 data-bs-toggle="offcanvas"
                 data-bs-target="#offcanvasWithBothOptions"
                 aria-controls="offcanvasWithBothOptions"
                 alt={recipient.name}/>
            <div className="message_header_details">
                <h4 className="message_header_title">{recipient.name}</h4>
                <span
                    className={recipient.status === 'online' ? 'message_header_status_online' : 'message_header_status_offline'}>
                    {recipient.status}
                </span>
            </div>
        </div>
    )
}

MessagePanelHeader.propTypes = {
    recipient: PropTypes.object
}
