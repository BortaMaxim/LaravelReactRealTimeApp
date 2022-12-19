import React, {useState} from 'react';

export const useActive = () => {
    const [friendId, setFriendId] = useState('')
    const [roomId, setRoomId] = useState('')
    const handleActive = (id, elName) => {
        if (elName === 'friends') {
            return setFriendId(id)

        } else if (elName === 'rooms') {
            return setRoomId(id)
        }
    }
    return {friendId, roomId, setFriendId, handleActive}
}
