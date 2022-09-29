import React from 'react';
import {Redirect, Route} from "react-router-dom";

export const GuardRoutes = ({component: Component, tokenVerified: Token, routeRedirect, ...rest}) => {
    const token = localStorage.getItem(Token)
    return(
        <Route {...rest} component={(props) => (
            token !== null
            ? <Component {...props}/>
            : <Redirect to={{pathname: routeRedirect, state: {from: props.location}}} />
        )}/>
    )
}
