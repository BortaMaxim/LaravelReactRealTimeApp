import React, {memo, useContext, useEffect, useRef} from 'react';
import {UnreadMessagesCountAction} from "../../../redux/actions/chat/userChatAction";
import {useDispatch, useSelector} from "react-redux";
import {useActive} from "../../../hooks/useActive";
import {Users} from "../Users";
import {useForm} from "../../../hooks/useForm";
import {
    ChannelDmSelectAction,
    ChannelsSelectAction,
    CreateChannelAction,
    DeleteChannelAction,
    GetOnePrivateChannelAction,
    GetOnePublicChannel,
} from "../../../redux/actions/channel/channelAction";
import PropTypes from "prop-types";
import {chatPropsValidation} from "../../../propTypes/chatPropTypes/chatPropsValidation";
import {GetNotificationsContainer} from "../ContainersComponent/GetNotificationsContainer";
import {CreateChanelContainer} from "../ContainersComponent/CreateChanelContainer";
import {PublicChannelsContainer} from "../ContainersComponent/PublicChannelsContainer";
import {PrivateChannelsContainer} from "../PrivateChannels/PrivateChannelsContainer";
import {useModal} from "../../../hooks/useModal";
import {InviteToChannelAction, JoinToChannel} from "../../../redux/actions/invites/invitesAction";
import {RoomsContainer} from "../ContainersComponent/RoomsContainer";
import {EchoChannelSelect, EchoDmSelect, OnlineEchoPublicChannelsUsers} from "../../../redux/actions/echo/echoActions";
import {LastMessageContext} from "../../../Context/LastMessageProvider";
import {PublicChannelContext} from "../../../Context/PublicChannelProvider";
import {PrivateChannelContext} from "../../../Context/PrivateChannelProvider";

const MGetNotificationsContainer = memo(GetNotificationsContainer)
export const ChannelPanel = () => {
    const {friendId, roomId, privateRoomId, setFriendId, handleActive} = useActive()
    const {open, setOpen} = useModal()
    const token = localStorage.getItem('user-token')
    const lastMessages = useContext(LastMessageContext)
    const dispatch = useDispatch()
    const inputRef = useRef([])
    const publicChannel = useContext(PublicChannelContext)
    const privateChannel = useContext(PrivateChannelContext)
    const {fields, handleChange, handleCheck, handleSubmit, clear} = useForm({
        channel_type: '',
    })
    const compareType = fields.channel_type === undefined || fields.channel_type === 'channel' ? 'public' : 'private'
    const compareVisible = fields.channel_type === undefined || fields.channel_type === 'channel' ? '1' : '0'

    const unreadMessagesCount = chatPropsValidation(useSelector(state => state.unreadMessagesCount))
    const getAllChannelsSelector = chatPropsValidation(useSelector(state => ({
        publicChannels: state.getAllPublicChannels.publicChannels,
        privateChannels: state.getAllPublicChannels.privateChannels,
        loading: state.getAllPublicChannels.loading,
        createChannelExeption: state.getAllPublicChannels.createChannelExeption,
    })))

    const profile = useSelector((state) => ({
        profile: state.auth.profile,
        onlineUsers: state.auth.onlineUsers
    }))
    const modify = useSelector((state) => state.modifyFlag)
    const recipient = chatPropsValidation(useSelector(state => state.recipient))

    useEffect(() => {
        if (!token) return
        dispatch(UnreadMessagesCountAction(token))
    }, [lastMessages])

    useEffect(() => {
        if (publicChannel !== null) {
            if (publicChannel.type === 'channel') {
                dispatch(ChannelsSelectAction(null, token))
                dispatch(EchoChannelSelect(publicChannel.id, token))
                // dispatch(OnlineEchoPublicChannelsUsers(publicChannel, token))
            }
        }
    }, [publicChannel])
    useEffect(() => {
        if (privateChannel !== null) {
            if (privateChannel.type === 'dm') {
                dispatch(ChannelDmSelectAction(null, token))
                dispatch(EchoDmSelect(privateChannel, token))
            }
        }
    }, [privateChannel])
    const createChannel = (e) => {
        e.preventDefault()
        let data = {
            channel_name: inputRef.current[1].value,
            detail_name: inputRef.current[2].value,
            detail_desc: inputRef.current[3].value,
            detail_visible: compareVisible,
            detail_type: compareType,
            channel_type: fields.channel_type || 'channel'
        }
        handleSubmit(CreateChannelAction(data, token))
        clear()
    }

    const setActiveRoom = (channel, e) => {
        if (e !== undefined) e.stopPropagation()
        handleActive(channel.id, 'rooms')
        dispatch(GetOnePublicChannel(channel.id, token))
    }
    const setPrivateActiveRoom = (channel, e) => {
        if (e !== undefined) e.stopPropagation()
        handleActive(channel.id, 'privateRooms')
        dispatch(GetOnePrivateChannelAction(channel.id, token))

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
                    inputRef={inputRef}
                    createChannel={createChannel}
                    handleCheck={handleCheck}
                    handleChange={handleChange}
                    getAllChannelsSelector={getAllChannelsSelector}
                />
                <MGetNotificationsContainer/>
            </div>
            <Users
                recipient={recipient}
                unreadMessagesCount={unreadMessagesCount}
                handleActive={handleActive}
                friendId={friendId}
                onlineUsers={profile.onlineUsers}
            />
            {
                publicChannel !== null
                    ? <div className="mb-3 mt-3"
                           style={{
                               display: modify === true || roomId === '' ? 'none' : 'block'
                           }}>
                        <PublicChannelsContainer
                            joinToChannel={joinToChannel}
                            deleteChannel={deleteChannel}
                            userChoice={userChoice}
                            inviteToChannel={inviteToChannel}
                            setOpen={setOpen}
                            open={open}
                            friendId={friendId}
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
                            deleteChannel={deleteChannel}
                            joinToChannel={joinToChannel}
                            inviteToChannel={inviteToChannel}
                            userChoice={userChoice}
                            open={open}
                            setOpen={setOpen}
                            friendId={friendId}
                            profile={profile.profile}
                            compairedOwnerId={privateChannel.owner_id === profile.profile.id}
                        />
                    </div>
                    : null
            }
            <RoomsContainer
                publicChannel={publicChannel}
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
    notifications: PropTypes.object,
}
