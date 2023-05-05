import React, {memo, useContext} from 'react';
import {PrivateMessages} from "../PrivateMessages";
import {ChatForm} from "../ChatForm";
import {useForm} from "../../../hooks/useForm";
import {useDispatch} from "react-redux";
import {
    AddPrivateMessageAction,
    SendPrivateMessageAction,
    SetPrivateMessageAction
} from "../../../redux/actions/chat/privateChatAction";
import {compareChannelUsers} from "../../../helpers/helpers";
import {toast} from "react-toastify";
import {toastOptions} from "../../../redux/utils";
import {ProfileContext} from "../../../Context/ProfileProvider";
import {PrivateMessagesContext} from "../../../Context/PrivateMessagesProvider";
import {PrivateChannelContext} from "../../../Context/PrivateChannelProvider";


let MPrivateMessages = memo(PrivateMessages)
export const PrivateMessagesContainer = (props) => {
    const {messagesEnd} = props
    const {fields, handleChange, clear} = useForm({message2: ''})
    const dispatch = useDispatch()
    const privateMessages = useContext(PrivateMessagesContext)
    const profile = useContext(ProfileContext)
    const privateChannel = useContext(PrivateChannelContext)
    const token = localStorage.getItem('user-token')
    const onSubmit = (e, channel) => {
        e.preventDefault()
        if (compareChannelUsers(privateChannel.users, profile.id) !== undefined) {
            if (!fields.message2) return
            dispatch(SetPrivateMessageAction(fields.message2))
            dispatch(AddPrivateMessageAction())
            dispatch(SendPrivateMessageAction(channel, token))
            clear()
        } else {
            toast.error('you must join to the channel!', toastOptions('top-right'))
        }
    }
    return (
        <div className="message_panel" ref={messagesEnd}>
            {
                privateMessages !== undefined && privateMessages.length !== 0
                    ? <>
                        <MPrivateMessages privateMessages={privateMessages}/>
                        <ChatForm
                            sendMessage={(e) => onSubmit(e, privateChannel)}
                            handleChange={handleChange}
                            fields={fields.message2}
                            inputName="message2"/>
                    </>
                    : <>
                        <span>no messages...</span>
                        <ChatForm
                            sendMessage={(e) => onSubmit(e, privateChannel)}
                            handleChange={handleChange}
                            fields={fields.message2}
                            inputName="message2"/>
                    </>
            }

        </div>
    )
}
