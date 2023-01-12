import React from 'react';
import {PrivateChannelPanel} from "./PrivateChannelPanel";
import {useSelector} from "react-redux";
import ModalPrivateChannelDetails from '../../../Components/Details/Modal'
import {PrivateChannelsDetails} from "./PrivateChannelsDetails";
import PropTypes from "prop-types";

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

PrivateChannelsContainer.propTypes = {
    profile: PropTypes.object,
    privateChannel: PropTypes.object,
    compairedOwnerId: PropTypes.bool,
    deleteChannel: PropTypes.func.isRequired,
    joinToChannel: PropTypes.func.isRequired,
    inviteToChannel: PropTypes.func.isRequired,
    userChoice: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    friendId: PropTypes.any,
    open: PropTypes.bool,
}
