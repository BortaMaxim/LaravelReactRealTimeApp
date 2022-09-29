import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {DashboardContainer} from "../Pages/ChatDashboard/DashboardContainer";
import {NoMatch} from "../Pages/NoMatch/NoMatch";

export const PrivateRoutes = (props) => {
    console.log(props)
    return (
        <Switch>
            <Route exact path={`${props.match.path}/dashboard`}>
                <DashboardContainer />
            </Route>
            <Route to={`${props.match.path}/*`}>
                <Redirect to={{pathname: `${props.match.path}/dashboard`}}/>
            </Route>
            <Route exact path={props.match.path} render={props => (
                <Redirect to={{pathname: `${props.match.path}/dashboard`}}/>
            )}/>
        </Switch>
    )
}
