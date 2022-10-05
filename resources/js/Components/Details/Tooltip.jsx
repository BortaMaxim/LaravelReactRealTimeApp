import React, {useState} from 'react';

export const Tooltip = ({children, text}) => {
    const [isHover, setIsHover] = useState(false)
    const handleMouseOver = () => {
        setIsHover(true)
    }
    const handleMouseOut = () => {
        setIsHover(false)
    }
    return (
        <>
            <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                {children}
            </div>
            {
                isHover ? <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary">
                    {text}
                </span>: null
            }
        </>
    )
}
