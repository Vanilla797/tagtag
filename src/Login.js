import React from 'react'
import styled from 'styled-components'

function Login() {
    return (
        <Container>
            <Content>
                <AmazonLogo src='http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG' />
                <h1>Sign into Tagtag</h1>
                <Username>
                    <label for="name">Username:</label>
                    <input type="text" id="username" name="username" required></input>
                </Username>
                <Password>
                    <label for="password">Password:</label>
                    <input type="text" id="password" name="password" required></input>
                </Password>
                <LoginButton
                    
                >
                    Sign in 
                </LoginButton>
            </Content>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    display: grid;
    place-items: center;
`
const Content = styled.div`
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px gray;
    text-align: center;
`
const AmazonLogo = styled.img`
    height: 100px;
    margin-bottom: 40px;
`
const Username = styled.div`
    display:space-between;

`

const Password = styled.div`
    display:space-between;
    margin-top:5px;
`

const LoginButton = styled.button`
    margin-top: 50px;
    background-color: #f0c14b;
    height: 40px;
    border: 2px solid #a88734;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
`