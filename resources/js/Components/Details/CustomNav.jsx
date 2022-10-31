import React, {useEffect} from 'react';
import {CustomSideBar} from "./CustomSideBar";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ProfileAction, StatusNotificationAction} from "../../redux/actions/authAction";

export const CustomNav = ({profile, logout}) => {
    const token = localStorage.getItem('user-token')
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(StatusNotificationAction(token))
    }, [token])

    useEffect(() => {
        dispatch(ProfileAction(token))
    }, [dispatch])
    return (
        <nav className="navbar bg-secondary fixed-top">
            <div className="container-fluid">
                <div className="row w-100 d-flex align-items-center">
                    <div className="col">
                        <button className="btn"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasWithBothOptions"
                                aria-controls="offcanvasWithBothOptions">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="col-6">
                        <h1 className="navbar-brand text-light">Chat</h1>
                    </div>
                    <div className="col">
                        <span className="badge badge-success">{profile.status}</span>
                    </div>
                    <div className="col d-flex">
                        <button className="btn btn-success" onClick={() => history.push('/chat/profile')}>
                            {profile.name}
                        </button>
                        <button className="btn btn-danger" onClick={logout} style={{marginLeft: 5}}>
                            Logout
                        </button>
                    </div>
                    <CustomSideBar />
                </div>
            </div>
        </nav>
    )
}
