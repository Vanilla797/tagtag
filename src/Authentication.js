import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
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
  );
};

export default AuthStateApp;
