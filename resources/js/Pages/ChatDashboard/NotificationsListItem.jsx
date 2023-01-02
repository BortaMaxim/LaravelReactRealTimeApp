import React from 'react';

export const NotificationsListItem = (props) => {
    const {el, profile, deleteNotification, showNotificationDetails} = props
    const {data} = el
    const {name} = profile
    const {sender_name, desc} = data

    return (
        <>
            <div className="channel_details_users">
                <div>
                            <span>
                                <strong>Owner of channel:</strong>
                                &nbsp;
                                {name}
                            </span>
                    <p><strong>{sender_name}</strong>&nbsp;{desc}</p>
                    <button
                        onClick={() => showNotificationDetails(el.id)}
                        className="btn btn-warning rounded-circle margin_right"
                    >
                        <i className="fa-sharp fa-solid fa-info"></i>
                    </button>
                    <button className="btn btn-outline-danger margin_right" onClick={() => deleteNotification(el.id)}>
                        <i className="fa-solid fa-trash-can" ></i>
                    </button>
                </div>
            </div>
        </>

    )
}
