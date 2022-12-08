import React from 'react';
import {UsersOfChannels} from "./UsersOfChannels";

export const PublicChannelDetails = ({publicChannelDetails}) => {
    const {users} = publicChannelDetails
    return (
        <div>
            <h6>name: {publicChannelDetails.name}</h6>
            <h6>type: {publicChannelDetails.type}</h6>
            <p>
                <strong>channels is: </strong>
                {publicChannelDetails.detail_type}
            </p>
            <p>
                <strong>about channel:</strong>
                &nbsp;
                {publicChannelDetails.desc}
            </p>
            <h4>Users:</h4>
            {
                users.length !== 0
                && <div className="public_channel_details_users_wrapper">
                    {
                        users.map(user => (
                            <UsersOfChannels key={user.id} user={user}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}
