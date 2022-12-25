import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditStudentList = ({ updateStudentList }) => {
  const [updatedList, setUpdatedList] = useState({
    id: updateStudentList._id,
    name: updateStudentList.name,
    age: updateStudentList.age,
    classes: updateStudentList.classes,
    section: updateStudentList.section,
    roll_no: updateStudentList.roll_no,
    email: updateStudentList.email,
    mobile: updateStudentList.mobile,
    address: updateStudentList.address,
  });

  const navigate = useNavigate();

  const studentListUpdated = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_URI}/update`, updatedList)
      .then(() => {
        toast.success("Student List Updated Successfully");
        navigate("/students");
      })
      .catch((err) => {
        toast.error("Error Ouccer");
      });
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUpdatedList({
      ...updatedList,
      [name]: value,
    });
  };

  return (
    <>
      <header style={{ paddingInline: "5rem" }}>
        <h1>Update Student Details</h1>
      </header>
      <EditForm onSubmit={studentListUpdated}>
        <input
          type={"text"}
          placeholder='Name'
          name='name'
          value={updatedList.name}
          onChange={handleChange}
        />
        <input
          type={"number"}
          placeholder='Age'
          name='age'
          value={updatedList.age}
          onChange={handleChange}
        />
        <input
          type={"number"}
          placeholder='Class'
          name='classes'
          value={updatedList.classes}
          onChange={handleChange}
        />
        <input
          type={"text"}
          placeholder='Section'
          name='section'
          value={updatedList.section}
          onChange={handleChange}
        />
        <input
          type={"number"}
          placeholder='Roll-No'
          name='roll_no'
          value={updatedList.roll_no}
          onChange={handleChange}
        />
        <input
          type={"email"}
          placeholder='Email'
          name='email'
          value={updatedList.email}
          onChange={handleChange}
        />
        <input
          type={"tel"}
          placeholder='Mobile'
          name='mobile'
          value={updatedList.mobile}
          onChange={handleChange}
        />
        <input
          type={"text"}
          placeholder='Address'
          name='address'
          value={updatedList.address}
          onChange={handleChange}
        />
        <input type={"submit"} value='Update' />
      </EditForm>
    </>
  );
};

export default EditStudentList;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
