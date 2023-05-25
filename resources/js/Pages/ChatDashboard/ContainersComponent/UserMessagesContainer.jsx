import React, {useContext, useEffect} from 'react';
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
import {ActiveUserIdContext} from "../../../Context/ActiveUserIdProvider";
import {ConversationContext} from "../../../Context/ConversationProvider";
import {TypingEventEchoAction} from "../../../redux/actions/echo/echoActions";
import {ProfileContext} from "../../../Context/ProfileProvider";

export const UserMessagesContainer = (props) => {
    const {
        messagesEnd,
    } = props
    const dispatch = useDispatch()
    const userMessages = useContext(ConversationContext)
    const activeUserId = useContext(ActiveUserIdContext)
    const user = useContext(ProfileContext)
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
                        <UserMessages userMessages={userMessages}/>
                        <ChatForm
                            sendMessage={sendMessage}
                            fields={fields.message}
                            handleChange={handleChange}
                            inputName="message"/>
                    </div>
                    : <div>
                        <span>no messages...</span>
                        <ChatForm
                            sendMessage={sendMessage}
                            fields={fields.message}
                            handleChange={handleChange}
                            inputName="message"/>
                    </div>
            }

        </div>
    )
}
