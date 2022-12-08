import React, {useEffect} from 'react';
import {CustomSideBar} from "./CustomSideBar";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ProfileAction, StatusNotificationAction} from "../../redux/actions/authAction";
import PropTypes from "prop-types";

export const CustomNav = ({profile, logout}) => {
    const history = useHistory()

    return (
        <nav className="navbar bg-secondary fixed-top">
            <div className="container-fluid">
                <div className="row w-100 d-flex align-items-center">
                    <div className="col-9">
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

CustomNav.propTypes = {
    profile: PropTypes.object,
    logout: PropTypes.func.isRequired,
}
