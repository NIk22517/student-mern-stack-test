import "./App.css";
import NavBar from "./components/NavBar";
import LogIn from "./components/LogIn";
import StudentAllData from "./components/StudentAllData";
import StudentAdd from "./components/StudentAdd";
import EditStudentList from "./components/EditStudentList";
import { Toaster } from "react-hot-toast";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [updateStudentList, setUpdateStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState("Log-In");

  return (
    <BrowserRouter>
      <NavBar admin={admin} />
      <Routes>
        <Route
          exact
          path='/auth/login'
          element={
            <LogIn
              setAdmin={setAdmin}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path='/students'
          element={
            <StudentAllData setUpdateStudentList={setUpdateStudentList} />
          }
        />
        <Route
          exact
          path='/student/add'
          element={<StudentAdd setLoading={setLoading} loading={loading} />}
        />
        <Route
          exact
          path='/update'
          element={
            <EditStudentList
              updateStudentList={updateStudentList}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
