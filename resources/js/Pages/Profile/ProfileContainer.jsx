import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ProfileAction} from "../../redux/actions/authAction";
import {authSelector} from "../../selectors/auth/authSelector";
import {CustomSpinner} from "../../Components/Details/CustomSpinner";
import {ProfileLeft} from "./ProfileLeft";
import {useForm} from "../../hooks/useForm";
import {ProfileRight} from "./ProfileRight";
import {echoInstance} from "../../bootstrap";

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('user-token')
    const echo = echoInstance(token)
    const profile = authSelector()
    const {fields, handleChange, handleUpload, setFields} = useForm({
        'name': '',
        'email': '',
        'avatar': '',
    })

    useEffect(() => {
     echo.private('test-channel')
         .listen('TestEvent', (data) => {
             console.log(data)
         })
    }, [])

    useEffect(() => {
        setFields(profile.profile)
    }, [profile.profile])

    useEffect(() => {
        dispatch(ProfileAction(token))
    }, [dispatch])
    return (
        <div className="container">
            {
                profile.loading === true
                    ? <CustomSpinner color={'secondary'}/>
                    : <>
                        <h1>Profile</h1>
                        <Link to="/chat/dashboard">
                            Go to dashboard
                        </Link>
                        <div className="row mt-5 mb-5">
                            <ProfileLeft
                                profile={profile.profile}
                                handleUpload={handleUpload}
                            />
                            <ProfileRight
                                fields={fields}
                                handleChange={handleChange}
                            />
                        </div>
                    </>
            }
        </div>
    )
}
