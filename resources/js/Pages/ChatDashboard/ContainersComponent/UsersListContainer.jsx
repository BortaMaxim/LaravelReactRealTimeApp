import React from 'react';
import {UsersList} from "../UsersList";
import useSearch from "../../../hooks/useSearch";
import SearchUsersForm from '../../../Components/Details/SearchForm'
import PropTypes from "prop-types";

export const UsersListContainer = (props) => {
    const {users, unreadMessagesCount, lastMessages, handleActive, friendId} = props
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
    users: PropTypes.array,
    unreadMessagesCount: PropTypes.number,
    lastMessages: PropTypes.object,
    handleActive: PropTypes.func.isRequired,
    friendId: PropTypes.any,
}
