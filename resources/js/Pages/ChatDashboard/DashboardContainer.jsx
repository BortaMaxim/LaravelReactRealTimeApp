import React, {useEffect} from 'react';
import {CustomNav} from "../../Components/Details/CustomNav";
import {Dashboard} from "./Dashboard";
import {useDispatch} from "react-redux";
import {LogoutAction, ProfileAction} from "../../redux/actions/authAction";
import {useHistory} from "react-router-dom";
import {authSelector} from "../../selectors/auth/authSelector";

export const DashboardContainer = () => {
    const token = localStorage.getItem('user-token')
    const history = useHistory()
    const dispatch = useDispatch()
    const profile = authSelector()
    const logout = () => {
        dispatch(LogoutAction(token, history))
    }
    useEffect(() => {
        dispatch(ProfileAction(token))
    }, [dispatch])
    return (
        <div>
            <CustomNav logout={logout} profile={profile.profile}/>
            <Dashboard />
        </div>
    )
}
