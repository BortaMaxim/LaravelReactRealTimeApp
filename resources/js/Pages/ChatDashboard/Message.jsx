import React from 'react';
import {URL} from '../../redux/utils'
import PropTypes from "prop-types";

export const Message = (props) => {
    const {el, profile} = props
    let profileIdComparison = profile.id === el.sender_id || !el.sender_id
    let isSent = el.read === null ? '' : (<small>&#10003;&#10003;<strong>{el.read}</strong></small>);

    return (
        <div className="w-100 mt-3 position-relative p-2 d-flex"
             style={{justifyContent: profileIdComparison ? 'flex-start': 'flex-end'}}>
            <div className="message"
                style={{
                    backgroundColor: profileIdComparison ? `#e2e8f0` : '#7ae572',
                }}>
                {isSent}
                {
                    profileIdComparison
                    && <div>
                        <img src={`${URL}/avatars/${profile.avatar}`} alt={profile.name} className="message_img"/>
                        <strong>{profile.name}</strong>
                    </div>
                }
                <p>
                    {el.message}
                </p>
                <small className="text-secondary message_date">{el.created_at}</small>
            </div>
        </div>
    )
}

Message.propTypes = {
    el: PropTypes.object,
    profile: PropTypes.object,
}
