import React, {memo, useContext} from 'react';
import {PublicMessages} from "../PublicMessages";
import {ChatForm} from "../ChatForm";
import {useForm} from "../../../hooks/useForm";
import {useDispatch} from "react-redux";
import {
    AddPublicMessageToChannel,
    SendPublicMessageAction,
    SetPublicMessageAction
} from "../../../redux/actions/chat/publiChatAction";
import {compareChannelUsers} from "../../../helpers/helpers";
import {toast} from "react-toastify";
import {toastOptions} from "../../../redux/utils";
import {ProfileContext} from "../../../Context/ProfileProvider";
import {PublicMessagesContext} from "../../../Context/PublicMessagesProvider";
import {PublicChannelContext} from "../../../Context/PublicChannelProvider";


let MPublicMessages = memo(PublicMessages)
export const PublicMessagesContainer = (props) => {
    const {
        messagesEnd,
    } = props
    const {fields, handleChange, clear} = useForm({message2: ''})
    const dispatch = useDispatch()
    const publicMessages = useContext(PublicMessagesContext)
    const profile = useContext(ProfileContext)
    const publicChannel = useContext(PublicChannelContext)
    const token = localStorage.getItem('user-token')
    const onSubmit = (e, channel) => {
        e.preventDefault()
        if (compareChannelUsers(publicChannel.users, profile.id) !== undefined) {
            if (!fields.message2) return
            dispatch(SetPublicMessageAction(fields.message2))
            dispatch(AddPublicMessageToChannel())
            dispatch(SendPublicMessageAction(channel, token))
            clear()
        } else {
            toast.error('you must join to the channel!', toastOptions('top-right'))
        }

    }

    return (
        <div className="message_panel" ref={messagesEnd}>
            {
                publicMessages !== undefined && publicMessages.length !== 0
                    ? <>
                        <MPublicMessages publicMessages={publicMessages}/>
                        <ChatForm
                            sendMessage={(e) => onSubmit(e, publicChannel)}
                            handleChange={handleChange}
                            fields={fields.message2}
                            inputName="message2"/>
                    </>
                    : <>
                        <span>no messages...</span>
                        <ChatForm
                            sendMessage={(e) => onSubmit(e, publicChannel)}
                            handleChange={handleChange}
                            fields={fields.message2}
                            inputName="message2"
                        />
                    </>
            }
        </div>
    )
}
