import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const StudentAdd = ({ setLoading, loading }) => {
  const [studentDetail, setStudentDetail] = useState({
    name: "",
    age: "",
    classes: "",
    section: "",
    roll_no: "",
    email: "",
    mobile: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_URI}/add`, studentDetail)
      .then(() => {
        setLoading(false);
        toast.success("Student Added Successfully");
        navigate("/students");
      })
      .catch((err) => {
        toast.error("Error Ouccer");
      });
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setStudentDetail({
      ...studentDetail,
      [name]: value,
    });
  }
  const clickHandle = () => {
    setLoading(true);
  };
  return (
    <>
      <header style={{ paddingInline: "5rem" }}>
        <h1>Add New Student</h1>
      </header>

      <AddForm onSubmit={handleSubmit}>
        <input
          type={"text"}
          placeholder='Name'
          name='name'
          value={studentDetail.name}
          onChange={handleChange}
        />
        <input
          type={"number"}
          placeholder='Age'
          name='age'
          value={studentDetail.age}
          onChange={handleChange}
        />
        <input
          type={"number"}
          placeholder='Class'
          name='classes'
          value={studentDetail.classes}
          onChange={handleChange}
        />
        <input
          type={"text"}
          placeholder='Section'
          name='section'
          value={studentDetail.section}
          onChange={handleChange}
        />
        <input
          type={"number"}
          placeholder='Roll-No'
          name='roll_no'
          value={studentDetail.roll_no}
          onChange={handleChange}
        />
        <input
          type={"email"}
          placeholder='Email'
          name='email'
          value={studentDetail.email}
          onChange={handleChange}
        />
        <input
          type={"tel"}
          placeholder='Mobile'
          name='mobile'
          value={studentDetail.mobile}
          onChange={handleChange}
        />
        <input
          type={"text"}
          placeholder='Address'
          name='address'
          value={studentDetail.address}
          onChange={handleChange}
        />
        <input type={"submit"} value='Add' onClick={clickHandle} />
      </AddForm>
    </>
  );
};

export default StudentAdd;

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 80vh; */

  input {
    margin-block: 0.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    border: 0.5px solid grey;
  }
  input[type="submit"] {
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
