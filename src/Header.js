import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src="../logo.png" alt="" />
        </Link>
      </Logo>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  height: 60px;
  /* background-color: #0f1111; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: white; */
`;
const Logo = styled.div`
  img {
    width: 100px;
    margin-left: 11px;
  }
`;
