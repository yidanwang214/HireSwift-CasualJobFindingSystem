import CssBaseline from "@mui/material/CssBaseline";
import Home from "./page/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import MyJob from "./page/MyJobs";
import { useSelector } from "react-redux";
import JobList from "./page/JobList";
import JobDescription from "./page/JobDescription";
import "./index.css";
import UserProfile from './components/UserProfile/UserProfile';
import EmployerProfile from './components/EmployerProfile/EmployerProfile';
import AboutUs from "./page/AboutUs";

function App() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const isAuthenticate = !!accessToken;

  return (
    <>
      <CssBaseline />
      <Header />
      <div style={{ marginTop: "150px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Register />} />
          <Route path="/joblist" element={<JobList />} />
          <Route path="/jobdescription/:jobId" element={<JobDescription />} />
          <Route path="login" element={<Login />} />
          <Route
            path="myjobs"
            element={isAuthenticate ? <MyJob /> : <Login />}
          />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/employer-profile" element={<EmployerProfile />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
