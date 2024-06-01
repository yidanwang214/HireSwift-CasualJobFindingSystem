import CssBaseline from "@mui/material/CssBaseline";
import Home from "./page/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initialiseUser } from "./redux/userSlice";
import JobList from './page/JobList';
import JobDescription from './page/JobDescription';
import './index.css';

function App() {


  return (
    <>
      <CssBaseline />
      <Header />
      <div style={{ marginTop: '150px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<Register/>}/>
          <Route path='/jobs' element={<JobList />} /> {/* Static route for JobList */}
          <Route path='/jobdescription' element={<JobDescription/>}/>
          <Route path="login" element={<Login />} />
          <Route
            path="myprofile"
            element={isAuthenticate ? <Profile /> : <Login />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
