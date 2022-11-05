import React from 'react';
import {URL} from "../../redux/utils";

export const RecipientDetails = ({recipient}) => {
    return (
        <div className="offcanvas-body profile_recipient">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Profile:</h5>
            {
                <img className="profile_recipient_img" src={`${URL}/avatars/${recipient.avatar}`} alt={recipient.name}/>
            }
            <h3>{recipient.name}</h3>
            <h5>{recipient.email}</h5>
            <hr/>
        </div>
    )
}
