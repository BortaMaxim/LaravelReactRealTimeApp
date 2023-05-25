import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TypingEventEchoAction} from "../redux/actions/echo/echoActions";
import {ProfileContext} from "../Context/ProfileProvider";
import {echoInstance} from "../bootstrap";

export const useForm = ({initialState = {}}) => {
    const dispatch = useDispatch()
    let token = localStorage.getItem('user-token')
    const user = useContext(ProfileContext)
    const [fields, setFields] = useState(initialState)
    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
        let echo = echoInstance(token)
        echo.private(`user-channel.${user.id}`)
            .whisper('typing', {
                user: user.name + ' is typing...',
                typing: true
            })
    }
    const handleUpload = (e) => {
        let files = e.target.files
        setFields({
            ...fields,
            [e.target.name]: files[0]
        })
    }

    const handleCheck = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.checked
        })
    }

    const handleSubmit = (action) => {
        dispatch(action)
    }
    const clear = () => {
        setFields({})
    }
    return {fields, handleCheck, handleChange, handleSubmit, clear, handleUpload, setFields}
}
