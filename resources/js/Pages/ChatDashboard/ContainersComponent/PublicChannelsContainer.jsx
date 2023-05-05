import React from 'react';
import {PublicChannelPanel} from "../PublicChannels/PublicChannelPanel";
import {PublicChannelDetails} from "../PublicChannels/PublicChannelDetails";
import ModalChannelDetails from "../../../Components/Details/Modal";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export const PublicChannelsContainer = (props) => {
    const {
        joinToChannel, deleteChannel,
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
                    setOpen={setOpen}
                    deleteChannel={deleteChannel}
                />
            </ModalChannelDetails>
        </>
    )
}
PublicChannelsContainer.propTypes = {
    joinToChannel: PropTypes.func.isRequired,
    profile: PropTypes.object,
    deleteChannel: PropTypes.func.isRequired,
    userChoice: PropTypes.func.isRequired,
    inviteToChannel: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    comparedOwnerId: PropTypes.bool,
    friendId: PropTypes.any,
    open: PropTypes.bool,
}
