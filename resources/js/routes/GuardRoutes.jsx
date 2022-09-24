import React from 'react';
import {Redirect, Route} from "react-router-dom";

export const GuardRoutes = ({component: Component, tokenVerified: Token, routeRedirect, ...rest}) => {
    return(
        <Route {...rest} component={(props) => (
            localStorage.getItem(Token)
            ? <Component {...props}/>
            : <Redirect to={{pathname: routeRedirect, state: {from: props.location}}} />
        )}/>
    )
}
