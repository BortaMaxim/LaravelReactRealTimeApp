import React from 'react';
import PropTypes from "prop-types";

export const Notifications = (props) => {
    const {notificationsCount, openHandler} = props
    return (
        <>
            <button className="btn btn-primary chat_panel_header_btns" onClick={openHandler}>
                <i className="fa-solid fa-bell"></i>
                {
                    notificationsCount !== 0
                        ? <span
                            className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
                                {notificationsCount}
                            </span>
                        : null
                }

            </button>
        </>
    )
}

Notifications.propTypes = {
    notificationsCount: PropTypes.number,
    openHandler: PropTypes.func.isRequired,
}
