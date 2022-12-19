import React, {useEffect} from 'react';
import {UnreadMessagesCountAction} from "../../redux/actions/chatAction";
import {useDispatch, useSelector} from "react-redux";
import {useActive} from "../../hooks/useActive";
import {Users} from "./Users";
import {Rooms} from "./Rooms";
import {useForm} from "../../hooks/useForm";
import {
    CreateChannelAction,
    DeleteChannelAction,
    GetOnePublicChannel,
    JoinToPublicChannel
} from "../../redux/actions/channelAction";
import PropTypes from "prop-types";
import {chatPropsValidation} from "../../propTypes/chatPropTypes/chatPropsValidation";
import {GetNotificationsContainer} from "./ContainersComponent/GetNotificationsContainer";
import {CreateChanelContainer} from "./ContainersComponent/CreateChanelContainer";
import {PublicChannelsContainer} from "./ContainersComponent/PublicChannelsContainer";

export const ChannelPanel = ({friends, isLoading, lastMessages, publicChannel}) => {
    const {friendId, roomId, handleActive} = useActive()
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()

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
    const recipient = chatPropsValidation(useSelector(state => state.recipient))


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

    const joinToPublicChannel = (e, id, setOpen) => {
        e.preventDefault()
        const {owner_id} = publicChannel
        dispatch(JoinToPublicChannel(id, owner_id, token))
        setOpen(false)
    }

    return (
        <div className="bg-secondary vh-100 p-2 channel">
            <div className="chat_panel_header">
                <CreateChanelContainer
                    fields={fields}
                    createChannel={createChannel}
                    handleCheck={handleCheck}
                    handleChange={handleChange}
                    createChannelSelector={createChannelSelector}
                />
                <GetNotificationsContainer
                    profile={profile}
                />
            </div>
            <Users
                recipient={recipient}
                isLoading={isLoading}
                users={friends}
                unreadMessagesCount={unreadMessagesCount}
                lastMessages={lastMessages}
                handleActive={handleActive}
                friendId={friendId}
            />
            {
                publicChannel !== null
                    ? <div className="mb-3 mt-3"
                           style={{
                               display: modify === true ? 'none' : 'block'
                           }}>
                        <PublicChannelsContainer
                            publicChannel={publicChannel}
                            joinToPublicChannel={joinToPublicChannel}
                            deleteChannel={deleteChannel}
                            profile={profile}
                            compairedOwnerId={publicChannel.owner_id === profile.id}
                        />
                    </div>
                    : null
            }
            <Rooms
                channels={getAllChannelsSelector.channels}
                setActiveRoom={setActiveRoom}
                roomId={roomId}
            />
        </div>
    )
}

ChannelPanel.propTypes = {
    friends: PropTypes.array,
    isLoading: PropTypes.bool,
    lastMessages: PropTypes.object,
}
