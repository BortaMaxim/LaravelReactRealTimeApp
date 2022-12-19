import React, {useState} from 'react';

export const useChannelPannelOpen = () => {
    const [openPublic, setOpenPublic] = useState(false)
    const [openPrivate, setOpenPrivate] = useState(false)
    const handlePublicToggle = () => setOpenPublic(!openPublic)
    const handlePrivateToggle = () => setOpenPrivate(!openPrivate)

    return {openPublic, openPrivate, handlePublicToggle, handlePrivateToggle}
}
