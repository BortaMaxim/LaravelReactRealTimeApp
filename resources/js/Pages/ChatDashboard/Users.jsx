import React from 'react';
import {UsersList} from "./UsersList";
import PropTypes from "prop-types";
import {RecipientAvatar} from "./RecipientAvatar";

export const Users = (props) => {
    const {isLoading, users, unreadMessagesCount, lastMessages, handleActive, friendId, recipient} = props

    return (
        <>
            <h1 className="text-light">Users:</h1>
            {
                friendId !== ''
                && <RecipientAvatar
                    recipient={recipient}
                />
            }
            <hr/>
            {
                isLoading === true
                    ? <span className="text-white">loading...</span>
                    : <>
                        {
                            users.length !== 0
                                ? <div className="channel">
                                    {
                                        users.map(el => (
                                            <UsersList
                                                unreadMessagesCount={unreadMessagesCount}
                                                lastMessage={lastMessages[el.id]}
                                                key={el.id}
                                                el={el}
                                                handleActive={handleActive}
                                                friendId={friendId}
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

Users.propTypes = {
    isLoading: PropTypes.bool,
    friends: PropTypes.array,
    unreadMessagesCount: PropTypes.number,
    lastMessages: PropTypes.object,
    handleActive: PropTypes.func.isRequired,
    id: PropTypes.any,
}
