import React, {useEffect} from 'react';
import {CustomSpinner} from "../Details/CustomSpinner";
import PropTypes from "prop-types";

let inputs = [
    {id: 1, title: 'Channel Name', name: 'channel_name', type: 'text'},
    {id: 2, title: 'Detail Name', name: 'detail_name', type: 'text'},
    {id: 3, title: 'Detail Desc', name: 'detail_desc', type: 'text'},
]

export const CreateChannelForm = (props) => {
    const {
        fields,
        inputRef,
        handleChange,
        createChannel,
        getAllChannelsSelector,
        compareType,
        compareVisible,
        handleCheck
    } = props
    const {loading, createChannelExeption} = getAllChannelsSelector
    return (
        <form onSubmit={createChannel}>
            {
                createChannelExeption.status === 422
                && <span className="text-danger">{createChannelExeption.data.message}</span>
            }
            {
                inputs.map((input) => (
                    <div className="mb-3" key={input.id}>
                        <label htmlFor={input.name} className="col-form-label">{input.title}:</label>
                        <input
                            type={input.type}
                            className="form-control"
                            id={input.id}
                            name={input.name}
                            ref={el => inputRef.current[input.id] = el}
                        />
                    </div>
                ))
            }
            <div className="mb-3">
                <label htmlFor="channel_type">Channel type:</label>
                &nbsp;
                <select
                    className="form-select"
                    id="channel_type"
                    name="channel_type"
                    onChange={handleChange}
                    value={fields.channel_type}>
                    <option value="channel">public</option>
                    <option value="dm">private</option>
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    hidden={true}
                    id="detail_visible"
                    name="detail_visible"
                    value={compareVisible}
                    readOnly={true}
                />
                <input
                    type="text"
                    hidden={true}
                    id="detail_type"
                    name="detail_type"
                    value={compareType}
                    readOnly={true}
                />
            </div>
            <div className="mb-3">
                {
                    loading === true
                        ? <CustomSpinner color="primary"/>
                        : <button type="submit" className="btn btn-outline-primary">
                            Create
                        </button>
                }
            </div>
        </form>
    )
}

CreateChannelForm.propTypes = {
    fields: PropTypes.object,
    handleCheck: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    createChannel: PropTypes.func.isRequired,
    getAllChannelsSelector: PropTypes.object.isRequired,
    compareType: PropTypes.string,
    compareVisible: PropTypes.string,
}
