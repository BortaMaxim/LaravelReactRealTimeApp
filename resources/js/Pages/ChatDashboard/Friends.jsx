import React from 'react';
import {FriendsList} from "./FriendsList";
import PropTypes from "prop-types";

export const Friends = (props) => {
    const {isLoading, friends, unreadMessagesCount, lastMessages, handleActive, id} = props

    return (
        <>
            <h1 className="text-light">Friends:</h1>
            <hr/>
            {
                isLoading === true
                    ? <span className="text-white">loading...</span>
                    : <>
                        {
                            friends.length !== 0
                                ? <div className="channel">
                                    {
                                        friends.map(el => (
                                            <FriendsList
                                                unreadMessagesCount={unreadMessagesCount}
                                                lastMessage={lastMessages[el.id]}
                                                key={el.id}
                                                el={el}
                                                handleActive={handleActive}
                                                id={id}
                                            />

                                        ))
                                    }
                                </div>
                                : <span>No Channels...</span>
                        }
                    </>
            }
        </>
    )
}

Friends.propTypes = {
    isLoading: PropTypes.bool,
    friends: PropTypes.array,
    unreadMessagesCount: PropTypes.number,
    lastMessages: PropTypes.object,
    handleActive: PropTypes.func.isRequired,
    id: PropTypes.any,
}
