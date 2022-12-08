import React, {useEffect} from 'react';
import {UnreadMessagesCountAction} from "../../redux/actions/chatAction";
import {useDispatch, useSelector} from "react-redux";
import {useActive} from "../../hooks/useActive";
import {Friends} from "./Friends";
import {Rooms} from "./Rooms";
import {CreateChannel} from "./CreateChannel";
import CreateChannelModal from "../../Components/Details/Modal";
import ModalChannelDetails from "../../Components/Details/Modal";
import {CreateChannelForm} from "../../Components/Channels/CreateChannelForm";
import {useModal} from "../../hooks/useModal";
import {useForm} from "../../hooks/useForm";
import {CreateChannelAction, DeleteChannelAction, GetOnePublicChannel} from "../../redux/actions/channelAction";
import PropTypes from "prop-types";
import {chatPropsValidation} from "../../propTypes/chatPropTypes/chatPropsValidation";
import {PublicChannelPanel} from "./PublicChannelPanel";
import {PublicChannelDetails} from "./PublicChannelDetails";

export const ChannelPanel = ({friends, isLoading, lastMessages, publicChannel}) => {
    const {friendId, roomId, handleActive} = useActive()
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()
    const {active, setActive} = useModal()
    const {open, setOpen} = useModal()

    const {fields, handleChange, handleCheck, handleSubmit, clear} = useForm({
        channel_name: '',
        detail_name: '',
        detail_desc: '',
        detail_visible: false,
        detail_type: ''
    })
    const unreadMessagesCount = chatPropsValidation(useSelector(state => state.unreadMessagesCount))
    const createChannelSelector = chatPropsValidation(useSelector(state => ({
        loading: state.createChannel.loading,
        createChannelExeption: state.createChannel.createChannelExeption,
    })))
    const getAllChannelsSelector = chatPropsValidation(useSelector(state => ({
        channels: state.getAllChannels
    })))
    const profile = useSelector((state) => state.auth.profile)
    const modify = useSelector((state) => state.modifyFlag)

    useEffect(() => {
        if (!token) return
        dispatch(UnreadMessagesCountAction(token))
    }, [lastMessages])

    const createChannel = (e) => {
        e.preventDefault()
        handleSubmit(CreateChannelAction(fields, token))
        clear()
    }

    const setActiveRoom = (id) => {
        handleActive(id, 'rooms')
        dispatch(GetOnePublicChannel(id, token))
    }

    const deleteChannel = (id) => {
        dispatch(DeleteChannelAction(id, token))
    }

    return (
        <div className="bg-secondary vh-100 p-2 channel">
            <div className="mt-5">
                <CreateChannel
                    handleOpen={() => setActive(true)}
                />
            </div>
            <CreateChannelModal
                isOpen={active}
                handleClose={() => setActive(false)}
                title="Create channel:"
            >
                <CreateChannelForm
                    createChannelSelector={createChannelSelector}
                    fields={fields}
                    handleChange={handleChange}
                    handleCheck={handleCheck}
                    createChannel={createChannel}
                />
            </CreateChannelModal>

            <Friends
                isLoading={isLoading}
                friends={friends}
                unreadMessagesCount={unreadMessagesCount}
                lastMessages={lastMessages}
                handleActive={handleActive}
                id={friendId}
            />
            {
                publicChannel !== null
                    ? <div className="mb-3 mt-3"
                           style={{
                               display: modify === true ? 'none' : 'block'
                           }}>
                        <PublicChannelPanel
                            profile={profile}
                            deleteChannel={deleteChannel}
                            handleOpen={() => setOpen(true)}
                            publicChannel={publicChannel}
                        />
                        <ModalChannelDetails
                            isOpen={open}
                            title="Channel details:"
                            handleClose={() => setOpen(false)}
                        >
                            <PublicChannelDetails publicChannelDetails={publicChannel}/>
                        </ModalChannelDetails>
                    </div>
                    : null
            }
            <Rooms
                channels={getAllChannelsSelector.channels}
                setActiveRoom={setActiveRoom}
                id={roomId}
            />
        </div>
    )
}

ChannelPanel.propTypes = {
    friends: PropTypes.array,
    isLoading: PropTypes.bool,
    lastMessages: PropTypes.object,
}
