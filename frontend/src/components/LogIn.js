import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const LogIn = ({ setAdmin, setLoading, loading }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_URI}/auth/login`, user)
      .then((data) => {
        setLoading(false);
        setAdmin(data.data.email);
        navigate("/students");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const clickHandle = () => {
    setLoading(true);
  };
  return (
    <LogInStyled action='' method='' onSubmit={handleSubmit}>
      <input
        type={"email"}
        placeholder='Email'
        value={user.email}
        name='email'
        onChange={handleChange}
        required
      />
      <input
        type={"password"}
        placeholder='Password'
        name='password'
        value={user.password}
        onChange={handleChange}
        required
      />
      <input type={"submit"} onClick={clickHandle} />

      {loading ? <Loader /> : ""}
    </LogInStyled>
  );
};

export default LogIn;

const LogInStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;

  input {
    margin-block: 0.5rem;
    padding: 0.5rem 1rem;
  }
  input[type="submit"] {
    border: none;
    background-color: blue;
    padding: 0.5rem 1rem;
    color: white;
  }
`;
