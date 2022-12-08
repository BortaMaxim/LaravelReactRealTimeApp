import React from 'react';
import PropTypes from "prop-types";

export const CreateChannel = (props) => {
    const {handleOpen} = props

    return (
        <button className="btn btn-primary mt-5" onClick={handleOpen}>
            &#10010;
        </button>
    )
}

CreateChannel.propTypes = {
    handleOpen: PropTypes.func.isRequired
}
