import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Login from "./Login";
// import SignUp from "./SignUp";
// import Header from "./Header";
import Amplify, { Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Upload from "./Upload";

Amplify.configure(awsconfig);
function App() {
  return (
    <div>
      <AmplifySignOut />
      <Upload />
    </div>
  );
}

export default withAuthenticator(App);
