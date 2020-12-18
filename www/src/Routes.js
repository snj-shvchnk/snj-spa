import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
/* Development section: */
import ApiDev from "./Pages/ApiDev";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            {/* Development section: */}
            <Route exact path="/apidev/" component={ApiDev} />
        </Switch>
    );
};

export default Routes;
