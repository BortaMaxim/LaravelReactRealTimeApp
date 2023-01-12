import React from 'react';
import {URL} from '../../redux/utils'
import PropTypes from "prop-types";

export const AllUsers = (props) => {
    const {inviteToChannel, users, userChoice, friendId, channelId} = props

    return (
        <div className="public_channel_details_users_wrapper">
            {
                users.length !== 0
                && users.map(el => (
                    <div
                        key={el.id}
                        className={`channel_details_users cursor ${el.id === friendId ? 'active' : ''}`}
                        onClick={() => userChoice(el.id)}
                    >
                        {el.name}
                        <img className="channel_details_users_avatar" src={`${URL}/avatars/${el.avatar}`} alt={el.name}/>
                    </div>
                ))
            }
            <button
                disabled={!friendId}
                className="btn btn-primary mt-3"
                onClick={() => inviteToChannel(friendId, channelId)}
            >
                Ok
            </button>
        </div>
    )
}

AllUsers.propTypes = {
    inviteToChannel: PropTypes.func.isRequired,
    userChoice: PropTypes.func.isRequired,
    users: PropTypes.array,
    friendId: PropTypes.any,
    channelId: PropTypes.number,
}
