import React from 'react';

export const ProfileRight = ({fields, handleChange}) => {
    const {name, email} = fields
    return (
        <div className="col p-4">
            <h3>Edit profile</h3>
            <div className="mb-3">
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
                    <button className="btn btn-outline-success">
                        update
                    </button>
                </div>
            </div>
        </div>
    )
}
