import React from 'react';
import {PublicMessages} from "../PublicMessages";
import {ChatForm} from "../ChatForm";

export const PublicMessagesContainer = (props) => {
    const {
        publicMessages,
        publicChannel,
        profile,
        sendChannelMessage,
        handleChange,
        messagesEnd,
        message2
    } = props

    return (
        <div className="message_panel" ref={messagesEnd}>
            {
                publicMessages !== undefined && publicMessages.length !== 0
                    ? <>
                        <PublicMessages publicMessages={publicMessages} profile={profile}/>
                        <ChatForm
                            sendMessage={(e) => sendChannelMessage(e, publicChannel)}
                            handleChange={handleChange}
                            fields={message2}
                            inputName="message2"/>
                    </>
                    : <>
                        <span>no messages...</span>
                        <ChatForm
                            sendMessage={(e) => sendChannelMessage(e, publicChannel)}
                            handleChange={handleChange}
                            fields={message2}
                            inputName="message2"
                        />
                    </>
            }
        </div>
    )
}
