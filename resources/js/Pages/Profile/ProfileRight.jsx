import React from 'react';
import {CustomSpinner} from "../../Components/Details/CustomSpinner";

export const ProfileRight = ({fields, handleChange, updateProfile, updateSelector, isShow}) => {
    const {name, email} = fields
    const {loading, validation} = updateSelector

    return (
        <div className="col p-4">
            <h3>Edit profile</h3>
            <div className="mb-3">
                {
                    isShow === true
                        ? <div>
                            {
                                validation.status === 422
                                && <div className="alert alert-danger" role="alert">
                                    {validation.data.message}
                                </div>
                            }
                        </div>
                        : null
                }
                <label htmlFor="nameInput" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    value={name || ''}
                    aria-describedby="nameHelp"
                    onChange={handleChange}
                />
                <div id="nameHelp" className="form-text">
                    edit your name
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="nameInput"
                    name="email"
                    value={email || ''}
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                />
                <div id="emailHelp" className="form-text">
                    edit your email
                </div>
                <div className="mt-3">
                    {
                        loading === true
                            ? <CustomSpinner color="success"/>
                            : <button className="btn btn-outline-success" onClick={updateProfile}>
                                update
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}
