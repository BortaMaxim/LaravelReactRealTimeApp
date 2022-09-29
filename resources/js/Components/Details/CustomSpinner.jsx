import React from 'react';

export const CustomSpinner = ({color}) => {
    return (
        <div className={`spinner-border text-${color}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
