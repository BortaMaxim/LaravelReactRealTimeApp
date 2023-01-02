import React, {useState} from 'react';

export const useActive = () => {
    const [friendId, setFriendId] = useState('')
    const [roomId, setRoomId] = useState('')
    const [privateRoomId, setPrivateRoomId] = useState('')
    const handleActive = (id, elName) => {
        if (elName === 'friends') {
            return setFriendId(id)
        } else if (elName === 'rooms') {
            setRoomId(id)
            setPrivateRoomId('')
        } else if (elName === 'privateRooms') {
            setPrivateRoomId(id)
            setRoomId('')
        }
    }
    return {friendId, privateRoomId, roomId, setFriendId, handleActive}
}
