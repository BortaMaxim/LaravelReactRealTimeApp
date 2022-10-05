import React from 'react';
import {useHistory} from "react-router-dom";

export const CustomDropDown = ({profile, logout}) => {
    const history = useHistory()
    return (
        <div className="dropdown btn-group dropstart">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                {profile.name}
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-start bg-secondary">

            </ul>
        </div>
    )
}
