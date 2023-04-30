import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ProfileAction, UpdateProfileAction} from "../../redux/actions/auth/authAction";
import {authSelector} from "../../selectors/auth/authSelector";
import {CustomSpinner} from "../../Components/Details/CustomSpinner";
import {ProfileLeft} from "./ProfileLeft";
import {useForm} from "../../hooks/useForm";
import {ProfileRight} from "./ProfileRight";
import {profileSelector} from "../../selectors/profile/profileSelector";

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('user-token')
    const profile = authSelector()
    const updateSelector = profileSelector()
    const {fields, handleChange, handleUpload,handleSubmit, setFields} = useForm({
        'name': '',
        'email': '',
        'avatar': '',
    })

    useEffect(() => {
        setFields(profile.profile)
    }, [profile.profile])

    useEffect(() => {
        dispatch(ProfileAction(token))
    }, [dispatch])

    const updateProfile = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', fields.name)
        formData.append('email', fields.email)
        formData.append('avatar', fields.avatar)
        handleSubmit(UpdateProfileAction(formData, token))
    }
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
                                updateSelector={updateSelector}
                                profile={profile.profile}
                                handleUpload={handleUpload}
                            />
                            <ProfileRight
                                isShow={profile.isShow}
                                fields={fields}
                                updateSelector={updateSelector}
                                updateProfile={updateProfile}
                                handleChange={handleChange}
                            />
                        </div>
                    </>
            }
        </div>
    )
}
