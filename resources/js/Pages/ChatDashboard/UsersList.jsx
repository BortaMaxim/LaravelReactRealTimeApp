import React from 'react';
import {FetchConversationWithAction} from "../../redux/actions/chat/userChatAction";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

export const UsersList = (props) => {
    const {el, handleActive, friendId, lastMessage, unreadMessagesCount} = props
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()

    const setActiveUserId = () => {
        dispatch(FetchConversationWithAction(el.id, token))
        handleActive(el.id, 'friends')
    }

    return (
        <div>
            <li
                className="list-group-item list-group-item-secondary p-2 mt-2 rounded-1 overflow-hidden"
                onClick={setActiveUserId}
                style={{backgroundColor: el.id === friendId ? '#84cfc7' : '', cursor: 'pointer'}}
            >
                {el.name}
                <br/>
                {
                    !lastMessage || lastMessage.read || lastMessage.sender_id !== el.id
                        ? ''
                        : <div className="d-flex justify-content-between align-items-center">
                            <small className="text-success">{lastMessage.message}</small>
                            {
                                unreadMessagesCount !== 0
                                    ? <small className="badge badge-pill badge-primary bg-primary">{unreadMessagesCount}</small>
                                    : null
                            }
                        </div>
                }
            </li>
        </div>
    )
}
UsersList.propTypes = {
    el: PropTypes.object,
    friendId: PropTypes.any,
    handleActive: PropTypes.func,
    lastMessage: PropTypes.any,
    unreadMessagesCount: PropTypes.number,
}
