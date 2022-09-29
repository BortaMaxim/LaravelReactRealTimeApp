import React from 'react'
import {Route, Switch} from "react-router-dom";
import {RegisterContainer} from "../Pages/Register/RegisterContainer";
import {LoginContainer} from "../Pages/Login/LoginContainer";
import {PrivateRoutes} from "./PrivateRoutes";
import {GuardRoutes} from "./GuardRoutes";
import {NoMatch} from "../Pages/NoMatch/NoMatch";

export const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'}>
                <RegisterContainer />
            </Route>
            <Route exact path={'/login'}>
                <LoginContainer />
            </Route>

            <GuardRoutes
                path={'/chat'}
                tokenVerified={'email-verified-at'}
                routeRedirect="/login"
                component={PrivateRoutes}
            />
            <Route exact path="*">
                <NoMatch />
            </Route>
        </Switch>
    )
}
