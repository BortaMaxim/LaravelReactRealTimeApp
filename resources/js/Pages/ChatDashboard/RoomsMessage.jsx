import React from 'react';
import {URL} from "../../redux/utils";

export const RoomsMessage = (props) => {
    const {el, profile} = props
    const compareUserId = el.user.id === profile.id

    return (
        <div
            className="w-100 mt-3 position-relative p-2 d-flex"
            style={{justifyContent: compareUserId === true ? 'flex-start' : 'flex-end'}}
        >
            <div className="message" style={{backgroundColor: compareUserId ? `#e2e8f0` : '#7ae572'}}>
                <img className="message_img" src={`${URL}/avatars/${el.user.avatar}`} alt={el.user.name}/>
                <strong>{el.user.name}</strong>
                <p>{el.message}</p>
                <small className="text-secondary message_date">{el.created_at}</small>
            </div>
        </div>
    )
}
