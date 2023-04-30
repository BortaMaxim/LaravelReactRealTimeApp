import React, {useEffect} from 'react';
import {UserMessages} from "../UserMessages";
import {ChatForm} from "../ChatForm";
import {useForm} from "../../../hooks/useForm";
import {
    AddLocalMsgToConversationAction,
    FetchConversationWithAction,
    SendMessageToAction,
    SetMessageAction
} from "../../../redux/actions/chat/userChatAction";
import {useDispatch} from "react-redux";

export const UserMessagesContainer = (props) => {
    const {
        userMessages,
        profile,
        messagesEnd,
        activeUserId
    } = props
    const dispatch = useDispatch()
    const token = localStorage.getItem('user-token')
    const {fields, clear, handleChange} = useForm({message: ''})

    useEffect(() => {
        if (activeUserId !== 0)
            dispatch(FetchConversationWithAction(activeUserId, token))
    }, [activeUserId])
    const sendMessage = (e) => {
        e.preventDefault()
        dispatch(SetMessageAction(fields.message))
        if (!fields.message) return
        dispatch(AddLocalMsgToConversationAction())
        dispatch(SendMessageToAction(activeUserId, token))
        clear()
    }

    return (
        <div className="message_panel" ref={messagesEnd}>
            {
                userMessages.length !== 0
                    ? <div>
                        <UserMessages userMessages={userMessages} profile={profile}/>
                        <ChatForm sendMessage={sendMessage} fields={fields.message} handleChange={handleChange}
                                  inputName="message"/>
                    </div>
                    : <div>
                        <span>no messages...</span>
                        <ChatForm sendMessage={sendMessage} fields={fields.message} handleChange={handleChange}
                                  inputName="message"/>
                    </div>
            }

        </div>
    )
}
