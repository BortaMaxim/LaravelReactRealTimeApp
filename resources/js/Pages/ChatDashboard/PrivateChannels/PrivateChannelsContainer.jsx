import React from 'react';
import {PrivateChannelPanel} from "./PrivateChannelPanel";
import {useSelector} from "react-redux";
import ModalPrivateChannelDetails from '../../../Components/Details/Modal'
import {PrivateChannelsDetails} from "./PrivateChannelsDetails";

export const PrivateChannelsContainer = (props) => {
    const {
        profile,
        privateChannel,
        compairedOwnerId,
        deleteChannel,
        joinToChannel,
        inviteToChannel,
        friendId,
        userChoice,
        open,
        setOpen
    } = props
    const users = useSelector((state) => state.chat.friends)

    return (
        <>
            <PrivateChannelPanel
                privateChannel={privateChannel}
                handleOpen={() => setOpen(true)}
            />
            <ModalPrivateChannelDetails
                isOpen={open}
                title="Private channels details:"
                handleClose={() => setOpen(false)}
            >
                <PrivateChannelsDetails
                    userChoice={userChoice}
                    joinToChannel={joinToChannel}
                    inviteToChannel={inviteToChannel}
                    friendId={friendId}
                    setOpen={setOpen}
                    profile={profile}
                    deleteChannel={deleteChannel}
                    allUsers={users}
                    privateChannel={privateChannel}
                    compairedOwnerId={compairedOwnerId}
                />
            </ModalPrivateChannelDetails>
        </>
    )
}
