import React from 'react';
import {ChatForm} from "./ChatForm";
import {Message} from "./Message";
import {URL} from "../../redux/utils";

export const MessagesPanel = (props) => {
    const {chatMessages, profile, sendMessage, handleChange, fields, activeUserId, messagesEnd, recipient} = props
    return (
        <>
            <div className="p-2 w-100">
                {
                    chatMessages.length !== 0
                        ? <>
                            {
                                recipient
                                && <div className="message_header">
                                    <img className="message_header_avatar" src={`${URL}/avatars/${recipient.avatar}`}
                                         data-bs-toggle="offcanvas"
                                         data-bs-target="#offcanvasWithBothOptions"
                                         aria-controls="offcanvasWithBothOptions"
                                         alt={recipient.name}/>
                                    <div className="message_header_details">
                                        <h4 className="message_header_title">{recipient.name}</h4>
                                        <span
                                            className={recipient.status === 'online' ? 'message_header_status_online' : 'message_header_status_offline'}>
                                        {recipient.status}
                                    </span>
                                    </div>
                                </div>
                            }
                            <div className="message_panel" ref={messagesEnd}>
                                {
                                    chatMessages.map((el, idx) => (
                                        <Message
                                            key={idx}
                                            el={el}
                                            profile={profile}
                                        />
                                    ))
                                }
                            </div>
                            <ChatForm
                                sendMessage={sendMessage}
                                handleChange={handleChange}
                                fields={fields}
                            />
                        </>
                        : <div>
                            <span>no messages...</span>
                            {
                                activeUserId !== 0 &&
                                <ChatForm
                                    sendMessage={sendMessage}
                                    handleChange={handleChange}
                                    fields={fields}
                                />
                            }
                        </div>
                }

            </div>
        </>
    )
}
