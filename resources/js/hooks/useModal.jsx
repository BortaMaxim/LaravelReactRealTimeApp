import React, {useState} from "react";


export const useModal = () => {
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

    const toggle = () => setActive(!active)

    return {
        toggle,
        active,
        setActive,
        open,
        setOpen
    }
}
