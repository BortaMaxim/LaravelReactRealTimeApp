import React from 'react';
import {useModal} from "../../hooks/useModal";
import FriendModal from '../../Components/Details/Modal'
import {AllUsers} from "../../Pages/ChatDashboard/AllUsers";
import PropTypes from "prop-types";

const InviteToChannelBtn = (props) => {
    const {usersList, userChoice, friendId, inviteToChannel, channelId} = props
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
                    channelId={channelId}
                    userChoice={userChoice}
                    inviteToChannel={inviteToChannel}
                />
            </FriendModal>
        </>
    )
}

InviteToChannelBtn.propTypes = {
    usersList: PropTypes.array,
    userChoice: PropTypes.func.isRequired,
    inviteToChannel: PropTypes.func.isRequired,
    friendId: PropTypes.any,
    channelId: PropTypes.number,
}
export default InviteToChannelBtn

