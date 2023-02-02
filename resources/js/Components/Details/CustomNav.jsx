import React, {memo, useEffect} from 'react';
import {CustomSideBar} from "./CustomSideBar";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {echoInstance} from "../../bootstrap";

export const CustomNav = memo(({profile, logout}) => {
    const history = useHistory()
    const token = localStorage.getItem('user-token')
    const echo = echoInstance(token)
    useEffect(() => {
        return () => echo.disconnect()
    }, [echo])

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
})

CustomNav.propTypes = {
    profile: PropTypes.object,
    logout: PropTypes.func.isRequired,
}
