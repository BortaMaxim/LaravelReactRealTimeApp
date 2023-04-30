import React from 'react';
import {useHistory} from "react-router-dom";
import {useForm} from "../../../hooks/useForm";
import {authSelector} from "../../../selectors/auth/authSelector";
import {ForgotPasswordAction} from "../../../redux/actions/auth/authAction";
import {CustomSpinner} from "../../../Components/Details/CustomSpinner";

export const ForgotPassword = () => {
    const history = useHistory()
    const forgotSelector = authSelector()
    const {fields, handleChange, handleSubmit} = useForm({
        email: ''
    })

    const sendEmail = (e) => {
        e.preventDefault()
        handleSubmit(ForgotPasswordAction(fields))
    }

    return (
        <div className="container" style={{height: 540}}>
            <h1 className="m-5">Forgot password</h1>
            <button className="btn btn-outline-primary m-3" onClick={() => history.goBack()}>
                back
            </button>
            <div className="row">
                <div className="col-sm-6">
                    {
                        forgotSelector.isShow === true
                            ? <div>
                                {
                                    forgotSelector.errorResponse.status === 422
                                    && <div className="alert alert-danger" role="alert">
                                        {forgotSelector.errorResponse.data.message}
                                    </div>
                                }
                            </div>
                            : null
                    }
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            name="email"
                            value={fields.email || ''}
                            aria-describedby="emailHelp"
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">
                            write your name
                        </div>
                        <div>
                            {
                                forgotSelector.loading === true
                                    ? <CustomSpinner color="primary"/>
                                    : <button className="btn btn-primary m-3" onClick={sendEmail}>
                                        send
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
