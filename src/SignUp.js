import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    // <Container>
    //     <Content>
    //         <h1>Sign Up</h1>
    //         <label for="email">Email address:</label>
    //         <input type="text" id="email" name="email" required></input><br/>
    //         <label for="firstName">First name:</label>
    //         <input type="text" id="firstName" name="firstName" required></input><br/>
    //         <label for="lastName">Lastname:</label>
    //         <input type="text" id="lastName" name="lastName" required></input><br/>
    //         <label for="password">Password:</label>
    //         <input type="text" id="password" name="password" required></input><br/>
    //         <label for="passwordc">Password confirm:</label>
    //         <input type="text" id="passwordc" name="passwordc" required></input><br/>
    //     <Button>
    //         Submit
    //     </Button>
    //     </Content>
    // </Container>
    <Container>
      <Content>
        <form>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <Link to="./">sign in?</Link>
          </p>
        </form>
      </Content>
    </Container>
  );
}

export default SignUp;

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
  /* text-align: left; */

  justify-content: space-between;
  label {
    width: 40%;
  }
`;

// const Button = styled.button`
//   margin-top: 40px;
//   background-color: #f0c14b;
//   height: 40px;
//   border: 2px solid #a88734;
//   border-radius: 4px;
//   padding: 4px 8px;
//   cursor: pointer;
//   text-align: center;
// `;
