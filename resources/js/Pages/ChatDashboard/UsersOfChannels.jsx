import React from 'react';
import {URL} from '../../redux/utils'

export const UsersOfChannels = ({user}) => {
    return (
        <div className="channel_details_users">
            <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                {/*<p>{user.status}</p>*/}
            </div>
            <img className="channel_details_users_avatar" src={`${URL}/avatars/${user.avatar}`} alt={user.name}/>
        </div>
    )
}
