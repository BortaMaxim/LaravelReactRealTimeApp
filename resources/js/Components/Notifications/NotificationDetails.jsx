import React from 'react';

export const NotificationDetails = (props) => {
    const {details} = props

    return (
        <>
            {
                details
                && <div>
                    <h5>Channel: <strong>{details.recv_channel}</strong></h5>
                    <h6>Type: <strong>{details.request_type}</strong></h6>
                    <h6>Sender: <strong>{details.sender_name}</strong></h6>
                </div>
            }
        </>
    )
}
