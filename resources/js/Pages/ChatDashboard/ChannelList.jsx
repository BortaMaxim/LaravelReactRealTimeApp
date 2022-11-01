import React, {useEffect, useState} from 'react';
import {SetActiveUserIdAction} from "../../redux/actions/chatAction";
import {useDispatch} from "react-redux";
import EventBus from "../../EventBus";
import {SET_ACTIVE_USER_ID} from "../../redux/types/chatActionTypes";

export const ChannelList = (props) => {
    const {el, handleActive, id, lastMessage, unreadMessagesCount} = props
    // const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()

    const setActiveUserId = () => {
        dispatch(SetActiveUserIdAction(el.id)).then(() => {
            EventBus.emit(SET_ACTIVE_USER_ID)
        })
        handleActive(el.id)
    }
    return (
        <li
            className="list-group-item list-group-item-secondary p-2 mt-2 rounded-1 overflow-hidden"
            onClick={setActiveUserId}
            style={{backgroundColor: el.id === id ? '#84cfc7' : '', cursor: 'pointer'}}
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
    )
}