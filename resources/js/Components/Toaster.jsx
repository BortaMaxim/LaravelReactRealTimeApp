import React from 'react';

export const ValidationForm = ({message, isShow}) => {
    return (
        <div className={`toast align-items-center position-absolute bottom-100 right-50 bg-secondary text-white`}
             role="alert"
             style={{zIndex: 1000}}
        >
            <div className="d-flex">
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    )
}
