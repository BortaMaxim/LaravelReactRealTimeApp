import React from 'react';
import {UsersOfChannels} from "../UsersOfChannels";
import DeleteChannelBtn from "../../../Components/Channels/DeleteChannelBtn";
import JoinToChannelBtn from '../../../Components/Channels/JoinToChannelBtn'
import InviteToChannelBtn from "../../../Components/Channels/InviteToChannelBtn";

export const PublicChannelDetails = (props) => {
    const {
        compairedOwnerId,
        publicChannel,
        deleteChannel,
        profile,
        joinToChannel,
        setOpen,
        allUsers, userChoice, friendId, inviteToChannel} = props
    const {users, owner_id, id, desc, name, type, detail_type} = publicChannel
    const compareAuthId = profile.id === owner_id

    return (
        <div>
            <h6>name: {name}</h6>
            <h6>type: {type}</h6>
            <p>
                <strong>channels is: </strong>
                {detail_type}
            </p>
            <p>
                <strong>about channel:</strong>
                &nbsp;
                {desc}
            </p>
            <div className="channel_actions">
                {
                    compairedOwnerId === true
                        ? <>
                            <DeleteChannelBtn
                                channelId={id}
                                deleteChannel={deleteChannel}
                            />
                            <InviteToChannelBtn
                                usersList={allUsers}
                                channelId={id}
                                userChoice={userChoice}
                                inviteToChannel={inviteToChannel}
                                friendId={friendId}
                            />
                        </>
                        : null
                }
                {
                    compareAuthId === false
                        ? <JoinToChannelBtn
                            channelId={id}
                            ownerId={owner_id}
                            type={type}
                            setOpen={setOpen}
                            joinToChannel={joinToChannel}
                        />
                        : null
                }
            </div>
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
