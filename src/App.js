import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

import AuthStateApp from "./Authentication";

Amplify.configure(awsconfig);
function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <AuthStateApp path="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
