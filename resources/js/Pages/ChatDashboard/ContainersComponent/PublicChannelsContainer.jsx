import React from 'react';
import {PublicChannelPanel} from "../PublicChannels/PublicChannelPanel";
import {PublicChannelDetails} from "../PublicChannels/PublicChannelDetails";
import ModalChannelDetails from "../../../Components/Details/Modal";
import {useSelector} from "react-redux";

export const PublicChannelsContainer = (props) => {
    const {
        publicChannel,
        joinToChannel,
        profile, deleteChannel,
        compairedOwnerId,
        userChoice,
        inviteToChannel,
        setOpen,
        friendId,
        open
    } = props

    const users = useSelector((state) => state.chat.friends)


    return (
        <>
            <PublicChannelPanel
                handleOpen={() => setOpen(true)}
                publicChannel={publicChannel}
            />
            <ModalChannelDetails
                isOpen={open}
                title="Channel details:"
                handleClose={() => setOpen(false)}
            >
                <PublicChannelDetails
                    userChoice={userChoice}
                    inviteToChannel={inviteToChannel}
                    allUsers={users}
                    friendId={friendId}
                    joinToChannel={joinToChannel}
                    profile={profile}
                    setOpen={setOpen}
                    publicChannel={publicChannel}
                    deleteChannel={deleteChannel}
                    compairedOwnerId={compairedOwnerId}
                />
            </ModalChannelDetails>
        </>
    )
}
