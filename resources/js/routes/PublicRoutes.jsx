import React from 'react'
import {Route, Switch} from "react-router-dom";
import {RegisterContainer} from "../Pages/Auth/Register/RegisterContainer";
import {LoginContainer} from "../Pages/Auth/Login/LoginContainer";
import {PrivateRoutes} from "./PrivateRoutes";
import {GuardRoutes} from "./GuardRoutes";
import {NoMatch} from "../Pages/NoMatch/NoMatch";
import {ForgotPassword} from "../Pages/Auth/ResetPassword/ForgotPassword";
import {ResetPassword} from "../Pages/Auth/ResetPassword/ResetPassword";

export const PublicRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'}>
                <RegisterContainer />
            </Route>
            <Route exact path={'/login'}>
                <LoginContainer />
            </Route>
            <Route exact path={'/forgot-password'}>
                <ForgotPassword />
            </Route>
            <Route exact path={'/reset-password'}>
                <ResetPassword />
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
