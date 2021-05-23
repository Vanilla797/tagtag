import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Login() {
  return (
    <Container>
      <Content>
        <h1>Sign into Tagtag</h1>
        <Username>
          <label for="name">Username:</label>
          <input type="text" id="username" name="username" required></input>
        </Username>
        <Password>
          <label for="password">Password:</label>
          <input type="text" id="password" name="password" required></input>
        </Password>
        <LoginButton>Sign in</LoginButton>
        <SignUp>
          Don't have an account yet?
          <Link to="/signup">Sign up</Link>
        </SignUp>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  display: grid;
  place-items: center;
`;
const Content = styled.div`
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px gray;
  text-align: center;
`;

const Username = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  display: space-between;
`;

const Password = styled.div`
  display: space-between;
  margin-top: 5px;
  margin-right: 20px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  background-color: #f0c14b;
  height: 40px;
  border: 2px solid #a88734;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
`;

const SignUp = styled.div`
  margin-top: 20px;
`;
