import React, {memo} from 'react';
import {useSelector} from "react-redux";
import {RecipientInfo} from "../../Pages/ChatDashboard/RecipientInfo";

export const CustomSideBar = memo(() => {
    const profile_recipient = useSelector(state => state.recipient)

    return (
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions"
             aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <RecipientInfo recipient={profile_recipient}/>
        </div>
    )
})
