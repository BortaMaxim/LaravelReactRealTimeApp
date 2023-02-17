import React from 'react';
import {PrivateMessages} from "../PrivateMessages";
import {ChatForm} from "../ChatForm";

export const PrivateMessagesContainer = (props) => {
    const {privateMessages, profile, sendChannelMessage, privateChannel, handleChange, message2, messagesEnd} = props
    return (
        <div className="message_panel" ref={messagesEnd}>
            {
                privateMessages !== undefined && privateMessages.length !== 0
                    ? <>
                        <PrivateMessages privateMessages={privateMessages} profile={profile}/>
                        <ChatForm
                            sendMessage={(e) => sendChannelMessage(e, privateChannel)}
                            handleChange={handleChange}
                            fields={message2}
                            inputName="message2"/>
                    </>
                    : <>
                        <span>no messages...</span>
                        <ChatForm
                            sendMessage={(e) => sendChannelMessage(e, privateChannel)}
                            handleChange={handleChange}
                            fields={message2}
                            inputName="message2"/>
                    </>
            }

        </div>
    )
}
