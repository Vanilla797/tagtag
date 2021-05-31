import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";
import Upload from "./Upload";
import Query from "./Query";
import styled from "styled-components";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const federated = {
    googleClientId:
      "654168486660-12gufebtkeluv0ucigr5r69qqnc00qcu.apps.googleusercontent.com", // Enter your googleClientId here
  };

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <Router>
      {authState === AuthState.SignedIn && user ? (
        <Switch>
          <Route>
            <Home path="/home">
              <AmplifySignOut />
              <Upload />

              <Query />
            </Home>
          </Route>
        </Switch>
      ) : (
        <AmplifyAuthenticator federated={federated}>
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            formFields={[
              {
                type: "email",
                label: "Email*",
                placeholder: "Enter your email",
                inputProps: { required: true, autocomplete: "username" },
              },
              {
                type: "password",
                label: "Password *",
                placeholder: "Enter the password",
                inputProps: { required: true, autocomplete: "new-password" },
              },
              {
                type: "given_name",
                label: "Given name *",
                placeholder: "Enter you given name",
                required: true,
              },
              {
                type: "family_name",
                label: "Family name *",
                placeholder: "Enter you family name",
                required: true,
              },
            ]}
          />
        </AmplifyAuthenticator>
      )}
    </Router>
  );
};

export default AuthStateApp;

const Home = styled.div``;
