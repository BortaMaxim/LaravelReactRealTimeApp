import React from 'react';

export const CustomSideBar = (props) => {
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar"
             aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Channels</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end">
                    HEllo
                </ul>
            </div>
        </div>
    )
}
