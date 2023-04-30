import React from 'react';
import SearchUsersForm from "../Details/SearchForm";
import useSearch from "../../hooks/useSearch";
import PropTypes from "prop-types";

export const OnlineUsersDetails = (props) => {
    const {usersOnline} = props
    const {state, handleChange} = useSearch(usersOnline, '')
    return (
        <ul className="list-group">
            <SearchUsersForm
                name={'users_online'}
                query={state.query}
                handleChange={handleChange}
            />
            {
                state.items.map((user => (
                    <li className="list-group-item list-group-item-action list-group-item-secondary" key={user.id.toString()}>{user.name}</li>
                )))
            }
            {
                state.items.length === 0 && <span className={"text-danger"}>empty...</span>
            }
        </ul>
    )
}

OnlineUsersDetails.propTypes = {
    usersOnline: PropTypes.array
}
