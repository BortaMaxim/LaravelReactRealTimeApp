import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {RecipientAvatar} from "./RecipientAvatar";
import {OnlineUsersContainer} from "./ContainersComponent/OnlineUsersContainer";
import {UsersListContainer} from "./ContainersComponent/UsersListContainer";
import {IsLoadingContext} from "../../Context/IsLoadingProvider";

export const Users = (props) => {
    const {unreadMessagesCount, handleActive, friendId, recipient, onlineUsers} = props
    const isLoading = useContext(IsLoadingContext)
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
                        unreadMessagesCount={unreadMessagesCount}
                        handleActive={handleActive}
                        friendId={friendId}
                    />
            }
        </>
    )
}

Users.propTypes = {
    users: PropTypes.array,
    unreadMessagesCount: PropTypes.number,
    handleActive: PropTypes.func.isRequired,
    friendId: PropTypes.any,
    recipient: PropTypes.object,
    onlineUsers: PropTypes.array,
}
