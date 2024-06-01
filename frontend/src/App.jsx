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



function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state)=>state.user.accessToken)
  const isAuthenticate = !!accessToken
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (userInfo && accessToken && refreshToken) {
      dispatch(initialiseUser({ userInfo, accessToken, refreshToken }));
      console.log("Initialising user with:", {
        userInfo,
        accessToken,
        refreshToken,
      });
    }
  }, [dispatch]);


  return (
    <>
      <CssBaseline />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="myprofile"
          element={
            isAuthenticate?<Profile/>:<Login/>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
