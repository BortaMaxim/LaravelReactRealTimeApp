import React from 'react';
import DeleteChannelBtn from "../../../Components/Channels/DeleteChannelBtn";
import InviteToChannelBtn from "../../../Components/Channels/InviteToChannelBtn";
import JoinToChannelBtn from "../../../Components/Channels/JoinToChannelBtn";
import {UsersOfChannels} from "../UsersOfChannels";
import PropTypes from "prop-types";

export const PrivateChannelsDetails = (props) => {
    const {
        privateChannel,
        compairedOwnerId,
        profile,
        allUsers,
        deleteChannel,
        friendId,
        userChoice,
        joinToChannel,
        inviteToChannel,
        setOpen
    } = props
    const {name, type, detail_type, desc, id, owner_id, users} = privateChannel
    const compareId = profile.id === owner_id

    return (
        <div>
            <p>Channel name: <strong>{name}</strong></p>
            <p>Channel type: <strong>{type}</strong></p>
            <p>Detail type: <strong>{detail_type}</strong></p>
            <p>About channel: <strong>{desc}</strong></p>
            <div className="channel_actions">
                {
                    compairedOwnerId === true
                        ? <>
                            <DeleteChannelBtn
                                deleteChannel={deleteChannel}
                                channelId={id}
                            />
                            <InviteToChannelBtn
                                channelId={id}
                                inviteToChannel={inviteToChannel}
                                userChoice={userChoice}
                                friendId={friendId}
                                usersList={allUsers}/>
                        </>
                        : null
                }
                {
                    compareId === false
                        ? <JoinToChannelBtn
                            channelId={id}
                            setOpen={setOpen}
                            ownerId={owner_id}
                            type={type}
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
PrivateChannelsDetails.propTypes = {
    privateChannel: PropTypes.object,
    compairedOwnerId: PropTypes.bool,
    profile: PropTypes.object,
    allUsers: PropTypes.array,
    friendId: PropTypes.any,
    deleteChannel: PropTypes.func.isRequired,
    userChoice: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    inviteToChannel: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
}
