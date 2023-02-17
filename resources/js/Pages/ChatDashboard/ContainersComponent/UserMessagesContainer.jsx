import React from 'react';
import {UserMessages} from "../UserMessages";
import {ChatForm} from "../ChatForm";

export const UserMessagesContainer = (props) => {
    const {userMessages, profile, messagesEnd, sendMessage, handleChange, message, activeUserId} = props

    return (
        <div className="message_panel" ref={messagesEnd}>
            {
                userMessages.length !== 0
                    ? <>
                        <UserMessages userMessages={userMessages} profile={profile}/>
                        <ChatForm sendMessage={sendMessage} handleChange={handleChange} fields={message} inputName="message"/>
                    </>
                    : <>
                        <span>no messages...</span>
                        <ChatForm sendMessage={sendMessage} handleChange={handleChange} fields={message} inputName="message"/>
                    </>
            }

        </div>
    )
}
