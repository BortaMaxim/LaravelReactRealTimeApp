import React from 'react';
import OnlineUserModal from '../../../Components/Details/Modal'
import {useModal} from "../../../hooks/useModal";
import {OnlineUsersDetails} from "../../../Components/OnlineUsers/OnlineUsersDetails";
import PropTypes from "prop-types";

export const OnlineUsersContainer = (props) => {
    const {onlineUsers} = props
    const {active, setActive} = useModal()
    return (
        <>
            {
                onlineUsers.length !== 0
                && <>
                    <h4 className="text-white cursor" onClick={() => setActive(true)}>
                        Online: {onlineUsers.length}
                    </h4>
                    <OnlineUserModal
                        isOpen={active}
                        title={"Online Users"}
                        handleClose={() => setActive(false)}
                    >
                        <OnlineUsersDetails usersOnline={onlineUsers}/>
                    </OnlineUserModal>
                </>
            }
        </>
    )
}
OnlineUsersContainer.propTypes = {
    onlineUsers: PropTypes.array
}
