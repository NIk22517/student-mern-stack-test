import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = ({ admin }) => {
  return (
    <Nav>
      <div className='logo'>
        <h1>Student</h1>
      </div>
      <div className='user-email'>
        <Link to={"/auth/login"}>
          <h1>{admin}</h1>
        </Link>
      </div>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  height: 10vh;
  background-color: #0062a3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-inline: 5rem;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
  }
`;
