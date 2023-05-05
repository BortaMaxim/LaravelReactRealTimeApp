import React from 'react';
import PropTypes from "prop-types";
import {MessageContainer} from "./ContainersComponent/MessageContainer";

export const MessagesPanel = () => {
    return (
        <>
            <div className="p-2 w-100">
                <MessageContainer />
            </div>
        </>
    )
}
