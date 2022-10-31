import React from 'react';
import {ChatForm} from "./ChatForm";
import {Message} from "./Message";

export const MessagesPanel = (props) => {
    const {chatMessages, profile, sendMessage, handleChange, fields} = props
    return (
        <div className="p-5 overflow-scroll w-100" style={{height: 650}}>
            {
                chatMessages.length !== 0
                ? <>
                        {
                            chatMessages.map((el, idx) => (
                                <Message
                                    key={idx}
                                    el={el}
                                    profile={profile}
                                />
                            ))
                        }
                        <ChatForm
                            sendMessage={sendMessage}
                            handleChange={handleChange}
                            fields={fields}
                        />
                    </>
                : <span>no messages...</span>
            }
        </div>
    )
}
