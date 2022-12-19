import React from 'react';
import {useModal} from "../../../hooks/useModal";
import {PublicChannelPanel} from "../PublicChannelPanel";
import {PublicChannelDetails} from "../PublicChannelDetails";
import ModalChannelDetails from "../../../Components/Details/Modal";
import {useDispatch, useSelector} from "react-redux";
import {useActive} from "../../../hooks/useActive";
import {InviteToChannelAction} from "../../../redux/actions/channelAction";

export const PublicChannelsContainer = (props) => {
    const {
        publicChannel,
        joinToPublicChannel,
        profile, deleteChannel,
        compairedOwnerId
    } = props
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()
    const {open, setOpen} = useModal()
    const {friendId, setFriendId} = useActive()
    const users = useSelector((state) => state.chat.friends)


    const userChoice = (id) => {
        setFriendId(id)
    }
    const inviteToChannel = (receiver_id) => {
        let data = {
            channel_id: publicChannel.id,
            receiver: receiver_id
        }
        dispatch(InviteToChannelAction(data, token))
        setOpen(false)
        setFriendId('')
    }

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
                    joinToPublicChannel={joinToPublicChannel}
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
