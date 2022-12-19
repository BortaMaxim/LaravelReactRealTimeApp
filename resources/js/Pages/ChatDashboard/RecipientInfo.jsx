import React from 'react';
import {URL} from '../../redux/utils'

export const RecipientInfo = (props) => {
    const {recipient} = props
    return (
        <div>
            <h3>Info:</h3>
            <img className="profile_recipient_img"
                 src={`${URL}/avatars/${recipient.avatar}`}
                 alt={recipient.name}/>
            <h5>name: <strong>{recipient.name}</strong></h5>
            <h5>email: <strong>{recipient.email}</strong></h5>
            <h5>
                status:
                &nbsp;
                <strong className={recipient.status === 'online' ? 'message_header_status_online' : 'message_header_status_offline'}>
                    {recipient.status}
                </strong>
            </h5>
        </div>
    )
}
