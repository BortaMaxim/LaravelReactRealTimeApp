import React, {useEffect} from 'react';
import {UnreadMessagesCountAction} from "../../../redux/actions/chatAction";
import {useDispatch, useSelector} from "react-redux";
import {useActive} from "../../../hooks/useActive";
import {Users} from "../Users";
import {Rooms} from "../Rooms";
import {useForm} from "../../../hooks/useForm";
import {
    ChannelsSelectAction,
    CreateChannelAction,
    DeleteChannelAction,
    GetOnePrivateChannelAction,
    GetOnePublicChannel,
    InviteToChannelAction,
    JoinToChannel
} from "../../../redux/actions/channelAction";
import PropTypes from "prop-types";
import {chatPropsValidation} from "../../../propTypes/chatPropTypes/chatPropsValidation";
import {GetNotificationsContainer} from "../ContainersComponent/GetNotificationsContainer";
import {CreateChanelContainer} from "../ContainersComponent/CreateChanelContainer";
import {PublicChannelsContainer} from "../ContainersComponent/PublicChannelsContainer";
import {PrivateChannelsContainer} from "../PrivateChannels/PrivateChannelsContainer";
import {useModal} from "../../../hooks/useModal";

export const ChannelPanel = ({friends, isLoading, lastMessages, publicChannel, privateChannel, notifications}) => {
    const {friendId, roomId, privateRoomId, setFriendId, handleActive} = useActive()
    const {open, setOpen} = useModal()
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()
    const detailPublic = 'public'
    const detailPrivate = 'private'
    const {fields, handleChange, handleCheck, handleSubmit, clear} = useForm({
        channel_name: '',
        detail_name: '',
        detail_desc: '',
        channel_type: '',
    })
    const compareType = fields.channel_type === undefined || fields.channel_type === 'channel' ? detailPublic : detailPrivate
    const compareVisible = fields.channel_type === undefined || fields.channel_type === 'channel' ? '1' : '0'

    const unreadMessagesCount = chatPropsValidation(useSelector(state => state.unreadMessagesCount))
    const getAllChannelsSelector = chatPropsValidation(useSelector(state => ({
        publicChannels: state.getAllChannels.publicChannels,
        privateChannels: state.getAllChannels.privateChannels,
        loading: state.getAllChannels.loading,
        createChannelExeption: state.getAllChannels.createChannelExeption,
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
        let data = {
            channel_name: fields.channel_name,
            detail_name: fields.detail_name,
            detail_desc: fields.detail_desc,
            detail_visible: compareVisible,
            detail_type: compareType,
            channel_type: fields.channel_type || 'channel'
        }
        handleSubmit(CreateChannelAction(data, token))
        clear()
    }

    const setActiveRoom = (channel) => {
        handleActive(channel.id, 'rooms')
        dispatch(GetOnePublicChannel(channel.id, token))
        dispatch(ChannelsSelectAction(channel, token))
    }
    const setPrivateActiveRoom = (channel) => {
        handleActive(channel.id, 'privateRooms')
        dispatch(GetOnePrivateChannelAction(channel.id, token))
        dispatch(ChannelsSelectAction(channel, token))

    }

    const deleteChannel = (id, type) => {
        dispatch(DeleteChannelAction(id, token, type))
    }

    const joinToChannel = (e, id, owner_id, type, setOpen) => {
        e.preventDefault()
        let data = {
            receiver: owner_id,
            channelType: type
        }
        dispatch(JoinToChannel(id, data, token))
        setOpen(false)
    }

    const userChoice = (id) => {
        setFriendId(id)
    }

    const inviteToChannel = (receiver_id, channelId) => {
        let data = {
            channel_id: channelId,
            receiver: receiver_id
        }
        dispatch(InviteToChannelAction(data, token))
        setOpen(false)
        setFriendId('')
    }

    return (
        <div className="bg-secondary vh-100 p-2 channel">
            <div className="chat_panel_header">
                <CreateChanelContainer
                    compareType={compareType}
                    compareVisible={compareVisible}
                    fields={fields}
                    createChannel={createChannel}
                    handleCheck={handleCheck}
                    handleChange={handleChange}
                    getAllChannelsSelector={getAllChannelsSelector}
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
                               display: modify === true || roomId === '' ? 'none' : 'block'
                           }}>
                        <PublicChannelsContainer
                            publicChannel={publicChannel}
                            joinToChannel={joinToChannel}
                            deleteChannel={deleteChannel}
                            userChoice={userChoice}
                            inviteToChannel={inviteToChannel}
                            setOpen={setOpen}
                            open={open}
                            profile={profile}
                            friendId={friendId}
                            compairedOwnerId={publicChannel.owner_id === profile.id}
                        />
                    </div>
                    : null
            }
            {
                privateChannel !== null
                    ? <div
                        style={{
                            display: modify === true || privateRoomId === '' ? 'none' : 'block'
                        }}>
                        <PrivateChannelsContainer
                            privateChannel={privateChannel}
                            deleteChannel={deleteChannel}
                            joinToChannel={joinToChannel}
                            inviteToChannel={inviteToChannel}
                            userChoice={userChoice}
                            open={open}
                            setOpen={setOpen}
                            friendId={friendId}
                            profile={profile}
                            compairedOwnerId={privateChannel.owner_id === profile.id}
                        />
                    </div>
                    : null
            }
            <Rooms
                publicChannels={getAllChannelsSelector.publicChannels}
                privateChannels={getAllChannelsSelector.privateChannels}
                setActiveRoom={setActiveRoom}
                setPrivateActiveRoom={setPrivateActiveRoom}
                roomId={roomId}
                privateRoomId={privateRoomId}
            />
        </div>
    )
}

ChannelPanel.propTypes = {
    friends: PropTypes.array,
    isLoading: PropTypes.bool,
    lastMessages: PropTypes.object,
    publicChannel: PropTypes.object,
    privateChannel: PropTypes.object,
}
