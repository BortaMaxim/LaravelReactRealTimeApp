import React, {useContext} from 'react';
import {URL} from '../../redux/utils'
import PropTypes from "prop-types";
import {ProfileContext} from "../../Context/ProfileProvider";

export const Message = (props) => {
    const {el} = props
    const profile = useContext(ProfileContext)
    let profileIdComparison = profile.id === el.sender_id || !el.sender_id
    let isSent = el.read === null ? '' : (
        <small className="text-secondary message_date">&#10003;&#10003;<strong>{el.read}</strong></small>);
    return (
        <div className="w-100 mt-3 position-relative p-2 d-flex"
             style={{justifyContent: profileIdComparison ? 'flex-start' : 'flex-end'}}
        >
            <div className="message"
                 style={{
                     backgroundColor: profileIdComparison ? `#e2e8f0` : '#7ae572',
                 }}>

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
                {isSent}
            </div>
        </div>
    )
}

Message.propTypes = {
    el: PropTypes.object,
    profile: PropTypes.object,
}
