import React, {useState} from 'react';
import {useDispatch} from "react-redux";

export const useForm = ({initialState = {}}) => {
    const dispatch = useDispatch()
    const [fields, setFields] = useState(initialState)
    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }
    const handleUpload = (e) => {
        let files = e.target.files
        setFields({
            ...fields,
            [e.target.name]: files[0]
        })
    }
    const handleSubmit = (action) => {
        dispatch(action)
    }
    const clear = () => {
        setFields({})
    }
    return {fields, handleChange, handleSubmit, clear, handleUpload, setFields}
}
