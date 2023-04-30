import React from 'react';
import PropTypes from "prop-types";

const SearchForm = ({name, handleChange, query}) => {

    return (
        <div className="form-group mb-3">
            <label htmlFor="searchUsers" className={"text-white"}>Search:</label>
            <input
                onChange={handleChange}
                name={name}
                type="search"
                className="form-control"
                id="searchUsers"
                value={query}
            />
        </div>
    )
};
SearchForm.propTypes = {
    name: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    query: PropTypes.string
}
export default SearchForm;
