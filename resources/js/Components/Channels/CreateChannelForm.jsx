import React from 'react';
import {CustomSpinner} from "../Details/CustomSpinner";
import PropTypes from "prop-types";

export const CreateChannelForm = (props) => {
    const {fields, handleChange, createChannel, createChannelSelector, compareType, compareVisible, handleCheck} = props
    const {loading, createChannelExeption} = createChannelSelector

    return (
        <form onSubmit={createChannel}>
            {
                createChannelExeption.status === 422
                && <span className="text-danger">{createChannelExeption.data.message}</span>
            }
            <div className="mb-3">
                <label htmlFor="channel_name" className="col-form-label">Channel name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="channel_name"
                    name="channel_name"
                    onChange={handleChange}
                    value={fields.channel_name || ''}/>
            </div>
            <div className="mb-3">
                <label htmlFor="detail_name" className="col-form-label">Detail name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="detail_name"
                    name="detail_name"
                    onChange={handleChange}
                    value={fields.detail_name || ''}/>
            </div>
            <div className="mb-3">
                <label htmlFor="detail_desc" className="col-form-label">Detail description:</label>
                <input
                    type="text"
                    className="form-control"
                    id="detail_desc"
                    name="detail_desc"
                    onChange={handleChange}
                    value={fields.detail_desc || ''}/>
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
                <label htmlFor="channel_type">Channel type:</label>
                &nbsp;
                <select
                    className="form-select"
                    id="channel_type"
                    name="channel_type"
                    defaultValue={'channel'}
                    onChange={handleChange}
                    value={fields.channel_type}>
                    <option value="dm">private</option>
                    <option value="channel">public</option>
                </select>
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
    createChannelSelector: PropTypes.object.isRequired,
    compareType: PropTypes.string,
    compareVisible: PropTypes.string,
}
