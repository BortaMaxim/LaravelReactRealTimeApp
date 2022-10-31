import React from 'react';
import {URL} from '../../redux/utils'

export const Message = (props) => {
    const {el, profile} = props
    let profileIdComparison = profile.id === el.sender_id || !el.sender_id
    let isSent = el.read === null ? '' : (<small>&#10003;&#10003;<strong>{el.read}</strong></small>);

    return (
        <div className="w-100 mt-3 position-relative p-2 d-flex"
             style={{justifyContent: profileIdComparison ? 'flex-start': 'flex-end'}}>
            <div
                style={{
                    width: '50%',
                    height: '50%',
                    backgroundColor: profileIdComparison ? `#e2e8f0` : '#7ae572',
                    minWidth: 200,
                    padding: 20,
                    borderRadius: 20,
                    boxShadow: '6px 3px 20px rgba(0, 0, 0, .5)'
                }}>
                {isSent}
                {
                    profileIdComparison
                    && <div>
                        <img src={`${URL}/avatars/${profile.avatar}`} alt={profile.name} style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            marginRight: 10
                        }}/>
                        <strong>{profile.name}</strong>
                    </div>
                }
                <p>
                    {el.message}
                </p>
                <small className="text-secondary position-absolute bottom-1 right-1">{el.created_at}</small>
            </div>
        </div>
    )
}
