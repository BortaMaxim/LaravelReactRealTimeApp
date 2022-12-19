import React from 'react';

export const NotificationsListItem = (props) => {
    const {el, profile} = props
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
                                {sender_name}
                            </span>
                    <p><strong>{name}</strong>&nbsp;{desc}</p>
                    <button className="btn btn-warning rounded-circle">
                        <i className="fa-sharp fa-solid fa-info"></i>
                    </button>
                </div>
            </div>
        </>

    )
}
