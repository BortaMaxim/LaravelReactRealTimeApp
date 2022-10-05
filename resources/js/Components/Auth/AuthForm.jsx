import React from 'react';
import {Link} from "react-router-dom";
import {CustomSpinner} from "../Details/CustomSpinner";

export const AuthForm = ({title, fields, handleChange, submitHandler, authSelector}) => {
    const {name, email, password, password_confirmation} = fields
    const {errorResponse, loading, isShow} = authSelector

    return (
        <>
            <div className={`d-flex justify-content-center ${title === 'login' && "pb-lg-5"}`}>
                <div className="card mt-5 p-5 w-50 shadow-lg p-3 mb-5 bg-body rounded" style={{minWidth: 300}}>
                    <div className="text-center">
                        {
                            title === 'register'
                                ? <h2 className="card-title">Register</h2>
                                : <h2 className="card-title">Login</h2>
                        }
                    </div>
                    {
                        isShow === true
                            ? <div>
                                {
                                    errorResponse.status === 422
                                    && <div className="alert alert-danger" role="alert">
                                        {errorResponse.data.message}
                                    </div>
                                }
                            </div>
                            : null
                    }
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                            {
                                title === 'register'
                                && <>
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
                                            write your name
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    className="form-control"
                                    id="emailInput"
                                    aria-describedby="emailHelp"
                                    onChange={handleChange}
                                />
                                <div id="emailHelp" className="form-text">
                                    write your email
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password || ''}
                                    className="form-control"
                                    id="passwordInput"
                                    aria-describedby="passwordHelp"
                                    onChange={handleChange}
                                />
                                <div id="passwordHelp" className="form-text">
                                    write your password
                                </div>
                            </div>
                            {
                                title === 'register'
                                && <div className="mb-3">
                                    <label htmlFor="passwordConfirmInput" className="form-label">Password confirm</label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={password_confirmation || ''}
                                        className="form-control"
                                        id="passwordConfirmInput"
                                        aria-describedby="passwordConfirmHelp"
                                        onChange={handleChange}
                                    />
                                    <div id="passwordConfirmHelp" className="form-text">
                                        confirm your password
                                    </div>
                                </div>
                            }
                            <div className="card-footer mt-5 d-flex justify-content-between align-items-center">

                                {
                                    title === 'register'
                                        ? <>
                                            {
                                                loading === true
                                                    ? <CustomSpinner color="primary"/>
                                                    : <button type="submit" className="btn btn-primary">
                                                        Registration
                                                    </button>
                                            }
                                            <Link to="/login">Login</Link>
                                        </>
                                        : <>
                                            {
                                                loading === true
                                                    ? <CustomSpinner color="primary"/>
                                                    : <button type="submit" className="btn btn-primary">
                                                        Login
                                                    </button>
                                            }
                                            <Link to="/forgot-password">
                                                Forgot password
                                            </Link>
                                            <Link to="/">Registration</Link>
                                        </>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
