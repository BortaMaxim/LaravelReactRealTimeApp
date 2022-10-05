import React, {useEffect, useState} from 'react';
import {authSelector} from "../../../selectors/auth/authSelector";
import {useDispatch} from "react-redux";
import {PasswordResetTokenAction, ResetPasswordAction} from "../../../redux/actions/authAction";
import {useForm} from "../../../hooks/useForm";
import {CustomSpinner} from "../../../Components/Details/CustomSpinner";
import {Link} from "react-router-dom";

export const ResetPassword = () => {
    const resetSelector = authSelector()
    const dispatch = useDispatch()
    const {errorResponse, loading, isShow} = resetSelector
    const resetToken = localStorage.getItem('reset-token')

    const {fields, handleChange, handleSubmit} = useForm({
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
    })
    useEffect(() => {
        dispatch(PasswordResetTokenAction())
    }, [dispatch])

    useEffect(() => {
        localStorage.getItem(resetToken)
        return () => localStorage.clear()
    }, [])

    fields.token = resetToken

    const resetPassword = (e) => {
        e.preventDefault()
        handleSubmit(ResetPasswordAction(fields))
    }

    return (
        <div className="container" style={{height: 490}}>
            <h1 className="m-5">Reset password</h1>
            <div className="row">
                <div className="m-3">
                    <Link to="/login">back</Link>
                </div>
                <div className="col-6">
                    <div className="card p-2 shadow" style={{width: '100%', minWidth: '300px'}}>
                        <form onSubmit={resetPassword}>
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
                            {
                                resetToken !== undefined
                                && <input type="hidden" name="token" value={fields.token || ''}/>
                            }
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailInput"
                                    name="email"
                                    value={fields.email || ''}
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
                                    value={fields.password || ''}
                                    className="form-control"
                                    id="passwordInput"
                                    aria-describedby="passwordHelp"
                                    onChange={handleChange}
                                />
                                <div id="passwordHelp" className="form-text">
                                    write your new password
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordConfirmationInput" className="form-label">Confirm
                                    password</label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={fields.password_confirmation || ''}
                                    className="form-control"
                                    id="passwordConfirmationInput"
                                    aria-describedby="passwordConfirmationHelp"
                                    onChange={handleChange}
                                />
                                <div id="passwordConfirmationHelp" className="form-text">
                                    confirm your new password
                                </div>
                            </div>
                            <div className="mb-3">
                                {
                                    loading === true
                                        ? <CustomSpinner color="primary"/>
                                        : <button className="btn btn-outline-success">
                                            send
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
