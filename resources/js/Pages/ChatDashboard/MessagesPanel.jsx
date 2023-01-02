import React from 'react';
import {ChatForm} from "./ChatForm";
import {Message} from "./Message";
import PropTypes from "prop-types";
import {RecipientAvatar} from "./RecipientAvatar";
import {PublicChannelPanel} from "./PublicChannels/PublicChannelPanel";

export const MessagesPanel = (props) => {
    const {
        chatMessages,
        profile,
        sendMessage,
        handleChange,
        fields,
        activeUserId,
        messagesEnd,
        recipient,
    } = props
    return (
        <>
            <div className="p-2 w-100">
                {
                    chatMessages.length !== 0
                        ? <>
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

MessagesPanel.propTypes = {
    chatMessages: PropTypes.array,
    profile: PropTypes.object,
    sendMessage: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    fields: PropTypes.string,
    activeUserId: PropTypes.number,
    messagesEnd: PropTypes.object,
    recipient: PropTypes.object,
}
