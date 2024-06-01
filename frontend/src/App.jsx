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
  const accessToken = useSelector(state => state.user.accessToken);
  const isAuthenticate = !!accessToken;

  return (
    <>
      <CssBaseline />
      <Header />
      <div style={{ marginTop: '150px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<Register/>}/>
          <Route path='/joblist' element={<JobList />} />
          <Route path='/jobdescription/:jobid' element={<JobDescription/>}/>
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
