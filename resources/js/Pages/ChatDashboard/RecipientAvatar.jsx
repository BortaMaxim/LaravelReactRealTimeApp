import React from 'react';
import {URL} from "../../redux/utils";
import PropTypes from "prop-types";
import defaultAvatar from '../../assets/profile-placeholder-3.jpg'


export const RecipientAvatar = (props) => {
    const {recipient} = props
    return (
        <>
            {
                recipient.avatar === null
                    ? <img className="message_header_avatar" src={defaultAvatar} alt={'avatar'}/>
                    : <img className="message_header_avatar" src={`${URL}/avatars/${recipient.avatar}`}
                           data-bs-toggle="offcanvas"
                           data-bs-target="#offcanvasWithBothOptions"
                           aria-controls="offcanvasWithBothOptions"
                           alt={recipient.name}/>
            }
        </>
    )
}

RecipientAvatar.propTypes = {
    recipient: PropTypes.object
}
