import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

const StudentAllData = ({ setUpdateStudentList }) => {
  const [studentList, setStudentList] = useState([]);

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_URI}/read`).then((res) => {
      setStudentList(res.data);
    });
  };

  const updateList = (list) => {
    setUpdateStudentList(list);
  };

  const deleteList = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URI}/delete/${id}`)
      .then(() => {
        toast.success("Student List Deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        toast.error("Error Ouccer");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainStyle>
      <StudentList>
        <h1>Student List</h1>
        <Link to={"/student/add"}>
          <button>Add New</button>
        </Link>
      </StudentList>
      <TableStyle>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Section</th>
            <th className='hide'>Roll-No</th>
            <th className='hide'>Email</th>
            <th className='hide'>Mobile</th>
            <th className='hide'>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((list) => {
            return (
              <tr key={list._id}>
                <td>{list.name}</td>
                <td>{list.age}</td>
                <td>{list.classes}</td>
                <td>{list.section}</td>
                <td className='hide'>{list.roll_no}</td>
                <td className='hide'>{list.email}</td>
                <td className='hide'>{list.mobile}</td>
                <td className='hide'>{list.address}</td>
                <td>
                  <Link to='/update'>
                    <button className='edit' onClick={() => updateList(list)}>
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className='delete'
                    onClick={() => deleteList(list._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableStyle>
      {studentList.length === 0 ? <Loader /> : ""}
    </MainStyle>
  );
};

export default StudentAllData;

const MainStyle = styled.main`
  padding-top: 0.5rem;
  width: 100%;
`;

const StudentList = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5rem 0rem 5rem;
  border: 1px solid #dddddd;
  button {
    border: 1px solid blue;
    color: blue;
    background-color: transparent;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const TableStyle = styled.table`
  border-collapse: collapse;
  width: inherit;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .edit {
    color: blue;
  }
  .delete {
    color: red;
  }

  @media (max-width: 800px) {
    background-color: aqua;
    .hide {
      display: none;
    }
  }
`;
