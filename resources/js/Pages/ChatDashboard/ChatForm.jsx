import React from 'react';

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
