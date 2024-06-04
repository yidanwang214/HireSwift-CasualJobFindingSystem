import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import client from "../utils/request";

const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [isNameTyped, setIsNameTyped] = useState(false);

  const handleUser = (e) => {
    setEmail(e.target.value);
    setIsNameTyped(true);
  };

  const handleUserFocus = () => {
    setUserFocus(true);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(email);
    setValidName(result);
  }, [email]);

  const [password, setPassword] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);
  const [isPwdTyped, setIsPwdTyped] = useState(false);
  const [validPwd, setValidPwd] = useState({
    isLowercase: false,
    isUppercase: false,
    isNumber: false,
    isSpecialChar: false,
    isCorrectLength: false,
  });
  const [pwdValidation, setPwdValidation] = useState(false);

  useEffect(() => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%]/;
    const lengthRegex = /.{8,24}/;
    const pwdValidation = PWD_REGEX.test(password);
    setValidPwd({
      isLowercase: lowercaseRegex.test(password),
      isUppercase: uppercaseRegex.test(password),
      isNumber: numberRegex.test(password),
      isSpecialChar: specialCharRegex.test(password),
      isCorrectLength: lengthRegex.test(password),
    });
    setPwdValidation(pwdValidation);
  }, [password]);

  const handlePwdFocus = () => {
    setPwdFocus(true);
  };

  const [errMsg, setErrMsg] = useState("");

  const handlePwdChange = (e) => {
    setPassword(e.target.value);
    setIsPwdTyped(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName || !pwdValidation) {
      setUserFocus(true);
      setIsNameTyped(true);
      setPwdFocus(true);
      setIsPwdTyped(true);
    }
    dispatch(loginStart());
    if (!validName) {
      emailRef.current.focus();
      return;
    } else if (!pwdValidation) {
      pwdRef.current.focus();
      return;
    }
    try {
      const resp = await client.post("/auth/login", { email, password });
      console.log(resp);
      const { user, tokens } = resp.data;
      const { access, refresh } = tokens;
      localStorage.setItem("accessToken", access.token);
      localStorage.setItem("refreshToken", refresh.token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(loginSuccess(resp.data));
      setEmail("");
      setPassword("");
      setIsNameTyped(false);
      setIsPwdTyped(false);
      navigate("/myjobs", { replace: true });
      // } else {
      //   dispatch(loginFailure(data.message || "An unexpected error occurred"));
      // }
    } catch (error) {
      console.error(error);
      dispatch(loginFailure("Network error"));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: "12px 12px", borderRadius: '12px' }}>
        <Typography component="h1" variant="h5" align="center">
          Log In
        </Typography>
        <Box
          sx={{ padding: "10px" }}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            value={email}
            required
            fullWidth
            id="email"
            label="email address"
            name="email"
            autoComplete="email"
            onChange={handleUser}
            onFocus={handleUserFocus}
            error={email ? !validName : false}
            inputRef={emailRef}
          />
          {userFocus && !validName && email && (
            <Typography
              sx={{
                fontSize: "small",
                padding: "5px",
                margin: "0px",
                color: "red",
              }}
            >
              Please enter the corrent email address.
            </Typography>
          )}
          {userFocus && !email && isNameTyped && (
            <Typography
              sx={{
                fontSize: "small",
                padding: "5px",
                margin: "0px",
                color: "red",
              }}
            >
              email is required
            </Typography>
          )}
          <TextField
            margin="normal"
            value={password}
            required
            fullWidth
            id="password"
            type="password"
            label="password"
            name="password"
            error={password ? !pwdValidation : false}
            onFocus={handlePwdFocus}
            onChange={handlePwdChange}
            inputRef={pwdRef}
          />
          {isPwdTyped && pwdFocus && !pwdValidation && password && (
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "5px",
                margin: "0px",
                listStyleType: "none",
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "small",
                }}
              >
                {validPwd.isLowercase ? (
                  <DoneIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}{" "}
                At least one lowercase letter{" "}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "small",
                }}
              >
                {validPwd.isUppercase ? (
                  <DoneIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}{" "}
                At least one uppercase letter{" "}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "small",
                }}
              >
                {validPwd.isNumber ? (
                  <DoneIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}{" "}
                At least one number{" "}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "small",
                }}
              >
                {validPwd.isSpecialChar ? (
                  <DoneIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}{" "}
                At least one special character
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "small",
                }}
              >
                {validPwd.isCorrectLength ? (
                  <DoneIcon sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}{" "}
                8 to 24 characters in length{" "}
              </li>
            </ul>
          )}
          {isPwdTyped && pwdFocus && !password && (
            <Typography
              sx={{ fontSize: "small", padding: "5px", color: "red" }}
            >
              Password is required.
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained">
            Log In
          </Button>
          {errMsg && <Typography color="error">{errMsg}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
