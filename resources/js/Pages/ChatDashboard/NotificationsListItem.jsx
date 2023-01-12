import React from 'react';
import PropTypes from "prop-types";

export const NotificationsListItem = (props) => {
    const {el, profile, deleteNotification, showNotificationDetails, accentInvite} = props
    const {data} = el
    const {name} = profile
    const {sender_name, desc, request_type, invite_id} = data

    return (
        <>
            <div className="channel_details_users">
                <div>
                            <span>
                                <strong>Owner of channel:</strong>
                                {request_type === 'JOIN' && <p>{name}</p>}
                                {request_type === 'INVT' && <p>{sender_name}</p>}
                            </span>

                    <strong>Type: {request_type}</strong>
                    <p>
                        {request_type === 'JOIN' && <strong>{sender_name}</strong>}
                        {request_type === 'INVT' && <strong>{name}</strong>}
                        &nbsp;{desc}
                    </p>
                    <button
                        onClick={() => showNotificationDetails(el.id)}
                        className="btn btn-warning rounded-circle margin_right"
                    >
                        <i className="fa-sharp fa-solid fa-info"></i>
                    </button>
                    <button className="btn btn-outline-danger margin_right" onClick={() => deleteNotification(el.id)}>
                        <i className="fa-solid fa-trash-can" ></i>
                    </button>
                    <button className="btn btn-outline-success" onClick={() => accentInvite(invite_id, request_type)}>
                        accept
                    </button>
                </div>
            </div>
        </>

    )
}
NotificationsListItem.propTypes = {
    el: PropTypes.shape({
        data: PropTypes.shape({
            desc: PropTypes.string,
            id: PropTypes.string,
            invite_id: PropTypes.number,
            recv_channel: PropTypes.string,
            request_type: PropTypes.string,
            sender_name: PropTypes.string,
            type: PropTypes.string
        }),
        id: PropTypes.string,
        read_at: PropTypes.any
    }),
    profile: PropTypes.object,
    deleteNotification: PropTypes.func.isRequired,
    showNotificationDetails: PropTypes.func.isRequired,
}
