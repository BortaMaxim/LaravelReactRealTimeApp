import React from 'react';
import {UsersList} from "./UsersList";
import PropTypes from "prop-types";
import {RecipientAvatar} from "./RecipientAvatar";
import {OnlineUsersContainer} from "./ContainersComponent/OnlineUsersContainer";
import useSearch from "../../hooks/useSearch";
import {UsersListContainer} from "./ContainersComponent/UsersListContainer";

export const Users = (props) => {
    const {isLoading, users, unreadMessagesCount, lastMessages, handleActive, friendId, recipient, onlineUsers} = props
    return (
        <>
            <div className="row">
                <div className="col-4">
                    <h4 className="text-light">Users:</h4>
                </div>
                <div className="col-4">
                    <OnlineUsersContainer onlineUsers={onlineUsers}/>
                </div>
            </div>
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
                    : <UsersListContainer
                        users={users}
                        unreadMessagesCount={unreadMessagesCount}
                        lastMessages={lastMessages}
                        handleActive={handleActive}
                        friendId={friendId}
                    />
            }
        </>
    )
}

Users.propTypes = {
    isLoading: PropTypes.bool,
    users: PropTypes.array,
    unreadMessagesCount: PropTypes.number,
    lastMessages: PropTypes.object,
    handleActive: PropTypes.func.isRequired,
    friendId: PropTypes.any,
    recipient: PropTypes.object,
    onlineUsers: PropTypes.array,
}
