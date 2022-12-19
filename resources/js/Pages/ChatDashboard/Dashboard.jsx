import React from 'react';
import {ChannelPanel} from "./ChannelPanel";
import {MessagesPanel} from "./MessagesPanel";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {chatPropsValidation} from "../../propTypes/chatPropTypes/chatPropsValidation";

export const Dashboard = (props) => {
    const {
        friends,
        isLoading,
        conversation,
        lastMessages,
        profile,
        sendMessage,
        handleChange,
        fields,
        activeUserId,
        messagesEnd
    } = props

    const publicChannel = useSelector(state => state.oneChannel)

    return (
        <div className="pt-lg-5">
            <div className="d-flex justify-content-center min-vw-100">
                <div className="w-25 p-0" style={{minWidth: 200}}>
                    <ChannelPanel
                        publicChannel={publicChannel}
                        friends={friends}
                        isLoading={isLoading}
                        lastMessages={lastMessages}
                    />
                </div>
                <MessagesPanel
                    publicChannel={publicChannel}
                    messagesEnd={messagesEnd}
                    activeUserId={activeUserId}
                    chatMessages={conversation}
                    profile={profile}
                    sendMessage={sendMessage}
                    handleChange={handleChange}
                    fields={fields}
                />
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    friends: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    conversation: PropTypes.array,
    lastMessages: PropTypes.object,
    profile: PropTypes.object,
    sendMessage: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    fields: PropTypes.string,
    activeUserId: PropTypes.number,
    messagesEnd: PropTypes.object,
}
