import React, {useContext} from 'react';
import {UsersList} from "../UsersList";
import useSearch from "../../../hooks/useSearch";
import SearchUsersForm from '../../../Components/Details/SearchForm'
import PropTypes from "prop-types";
import {FriendsContext} from "../../../Context/FriendsProvider";
import {LastMessageContext} from '../../../Context/LastMessageProvider'
export const UsersListContainer = (props) => {
    const {unreadMessagesCount, handleActive, friendId} = props
    const users = useContext(FriendsContext)
    const lastMessages = useContext(LastMessageContext)
    const {state, handleChange} = useSearch(users, '')

    return (
        <>
            <SearchUsersForm  handleChange={handleChange} name={'users'} query={state.query} />
            {
                users.length !== 0
                    ? <div className="channel">
                        {
                            state.items.map(el => (
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
                        {
                            state.items.length === 0 && <span className={"text-danger"}>empty...</span>
                        }
                    </div>
                    : <span>No Users...</span>
            }
        </>
    )
}
UsersListContainer.propTypes = {
    unreadMessagesCount: PropTypes.number,
    handleActive: PropTypes.func.isRequired,
    friendId: PropTypes.any,
}
