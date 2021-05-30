import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

import Upload from "./Upload";
import AuthStateApp from "./Authentication";

Amplify.configure(awsconfig);
function App() {
  return (
    <div>
      <AuthStateApp />
      <Upload />
    </div>
  );
}

export default App;
