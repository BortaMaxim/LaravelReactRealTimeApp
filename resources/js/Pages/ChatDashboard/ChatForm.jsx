import React from 'react';
import PropTypes from "prop-types";

export const ChatForm = ({sendMessage, fields, handleChange}) => {

    return (
        <div className="w-100">
            <hr/>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    name="message"
                    className="form-control-lg w-100"
                    placeholder="write a message..."
                    value={fields || ''}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

ChatForm.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    fields: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}
