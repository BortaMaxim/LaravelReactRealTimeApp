import React from 'react';
import {AuthForm} from "../../../Components/Auth/AuthForm";
import {useHistory} from "react-router-dom";
import {authSelector} from "../../../selectors/auth/authSelector";
import {useForm} from "../../../hooks/useForm";
import {LoginAction} from "../../../redux/actions/authAction";

export const LoginContainer = () => {
    const history = useHistory()
    const loginSelector = authSelector()
    const {fields, handleChange, handleSubmit, clear} = useForm({
        email: '',
        password: '',
    })
    const login = (e) => {
        e.preventDefault()
        handleSubmit(LoginAction(fields, history))
        clear()
    }
    return (
        <div className="bg-primary p-2 text-dark bg-opacity-10">
            <AuthForm title="login"
                      authSelector={loginSelector}
                      fields={fields}
                      handleChange={handleChange}
                      submitHandler={login}
            />
        </div>
    )
}
