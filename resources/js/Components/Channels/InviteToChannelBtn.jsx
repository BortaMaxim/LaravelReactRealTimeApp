import React from 'react';
import {useModal} from "../../hooks/useModal";
import FriendModal from '../../Components/Details/Modal'
import {AllUsers} from "../../Pages/ChatDashboard/AllUsers";

const InviteToChannelBtn = (props) => {
    const {usersList, userChoice, friendId, inviteToChannel} = props
    const {open, setOpen} = useModal()

    return (
        <>
            <button
                className="btn btn-outline-success chat_panel_header_btns"
                onClick={() => setOpen(true)}
            >
                invite
            </button>
            <FriendModal
                isOpen={open}
                title="Users:"
                handleClose={() => setOpen(false)}
            >
                <AllUsers
                    users={usersList}
                    friendId={friendId}
                    userChoice={userChoice}
                    inviteToChannel={inviteToChannel}
                />
            </FriendModal>
        </>
    )
}

export default InviteToChannelBtn

