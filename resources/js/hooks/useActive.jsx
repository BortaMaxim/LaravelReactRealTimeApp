import React, {useState} from 'react';

export const useActive = () => {
    const [id, setId] = useState('')
    const handleActive = (id) => {
        setId(id)
    }
    return {id, handleActive}
}
