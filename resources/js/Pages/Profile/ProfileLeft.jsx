import React from 'react';
import avatarPlaceholder from '../../assets/profile-placeholder-3.jpg'
import {URL} from '../../redux/utils'
import {Tooltip} from "../../Components/Details/Tooltip";

export const ProfileLeft = ({profile, handleUpload}) => {
    const {avatar, name, email} = profile
    return (
        <div className="col">
            <div className="card" style={{width: '30rem'}}>
                <Tooltip text="upload avatar">
                    <label
                        htmlFor="upload_avatar"
                        style={{cursor: 'pointer'}}
                    >
                        <img style={{width: '100%'}} src={avatar === null ? avatarPlaceholder : `${URL}/${avatar}`} alt={name}/>
                    </label>
                    <input
                        accept="image/*"
                        name="avatar"
                        type="file"
                        hidden={true}
                        onChange={handleUpload}
                        id="upload_avatar"
                    />
                </Tooltip>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{email}</p>
                    </div>
            </div>
        </div>
    )
};
