import React, {useEffect} from 'react';
import {ChannelList} from "./ChannelList";
import {UnreadMessagesCountAction} from "../../redux/actions/chatAction";
import {useDispatch, useSelector} from "react-redux";
import {useActive} from "../../hooks/useActive";

export const ChannelPanel = ({friends, isLoading, lastMessages}) => {
    const {id, handleActive} = useActive()
    const token = localStorage.getItem('user-token')
    const dispatch = useDispatch()
    const unreadMessagesCount = useSelector(state => state.unreadMessagesCount)
    console.log(unreadMessagesCount)
    useEffect(() => {
        if (!token) return
        dispatch(UnreadMessagesCountAction(token))
    }, [lastMessages])

    return (
        <div className="bg-secondary vh-100 p-3">
            <h1 className="text-light">Channels:</h1>
            <hr/>
            {
                isLoading === true
                    ? <span className="text-white">loading...</span>
                    : <>
                        {
                            friends.length !== 0
                                ? <div>
                                    {
                                        friends.map(el => (
                                            <ChannelList
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
        </div>
    )
}
