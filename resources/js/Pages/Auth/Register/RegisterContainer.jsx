import React from 'react';
import {AuthForm} from "../../../Components/Auth/AuthForm";
import {useForm} from "../../../hooks/useForm";
import {authSelector} from "../../../selectors/auth/authSelector";
import {RegisterAction} from "../../../redux/actions/auth/authAction";
import {useHistory} from "react-router-dom";

export const RegisterContainer = () => {
    const history = useHistory()
    const registerSelector = authSelector()
    const {fields, handleChange, handleSubmit, clear} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const registration = (e) => {
        e.preventDefault()
        handleSubmit(RegisterAction(fields, history))
        clear()
    }

    return (
        <div className="bg-primary p-2 bg-opacity-10">
            <AuthForm
                authSelector={registerSelector}
                title="register"
                fields={fields}
                handleChange={handleChange}
                submitHandler={registration}
            />
        </div>
    )
};
