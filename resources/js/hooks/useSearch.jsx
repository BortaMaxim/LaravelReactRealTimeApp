import React, {useState} from 'react';

const useSearch = (items, query) => {
    const [state, setState] = useState({
        items,
        query
    })
    const handleChange = (e) => {
        let result = items.filter((item) => {
            if (e.target.value === '') return items
            return item.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState((prev) => ({
            ...prev,
            query: e.target.value,
            items: result
        }))
    }
    return {state, handleChange}
}

export default useSearch;
