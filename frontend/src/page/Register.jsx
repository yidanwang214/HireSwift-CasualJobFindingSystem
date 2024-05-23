import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";

const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const NAME_REGEX = /^(?!\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~`\-='"]{6,16}$/
const lowercaseRegex = /[a-z]/
const uppercaseRegex = /[A-Z]/
const numberRegex = /[0-9]/
const specialCharRegex = /[!@#$%]/
const lengthRegex = /.{8,24}/

const Register = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();
  const nameRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [isNameTyped, setIsNameTyped] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setIsNameTyped(true);
  };

  const handleNameFocus = () => {
    setNameFocus(true);
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [isEmailTyped, setIsEmailTyped] = useState(false);

  const handleUser = (e) => {
    setEmail(e.target.value);
    setIsEmailTyped(true);
  };

  const handleUserFocus = () => {
    setUserFocus(true);
  };

  useEffect(() => {
    const result = USER_REGEX.test(email);
    setValidEmail(result);
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

  const [matchPwd, setMatchPwd] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [isMatchTyped, setIsMatchTyped] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlePwdChange = (e) => {
    setPassword(e.target.value);
    setIsPwdTyped(true);
  };

  const handleMatchPwd = (e) => {
    setMatchPwd(e.target.value);
    setIsMatchTyped(true);
  };

  const handleMatchPwdFocus = () => {
    setMatchPwdFocus(true);
  };

  useEffect(() => {
    const result = matchPwd === password;
    setIsMatch(result);
  }, [matchPwd, password]);

  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [isNocheckSubmit, setIsNocheckSbumit] = useState(false);

  const handlePrivacyCheck = (e) => {
    setPrivacyChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validName ||
      !validEmail ||
      !pwdValidation ||
      !isMatch ||
      !privacyChecked
    ) {
      setNameFocus(true);
      setIsEmailTyped(true);
      setPwdFocus(true);
      setIsPwdTyped(true);
      setMatchPwdFocus(true);
      setIsMatchTyped(true);
    }
    if (!validEmail) {
      userRef.current.focus();
      return;
    } else if (!pwdValidation) {
      pwdRef.current.focus();
      return;
    } else if (!isMatch) {
      matchPwdRef.current.focus();
      return;
    } else if (!privacyChecked) {
      setIsNocheckSbumit(true);
      return;
    } else if (!validName) {
      userRef.current.focus();
      return;
    }
    setIsNocheckSbumit(false);

    const response = await fetch("http://localhost:3000/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Sign up successful " + data.user.name)
      setEmail('')
      setName('')
      setPassword('')
      setMatchPwd('')
      setPrivacyChecked(false)
      setIsNameTyped(false)
      setIsEmailTyped(false)
      setIsMatchTyped(false)
      setIsPwdTyped(false)
    } else {
      setErrMsg(data.message || "An unexpected error occurred");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={6}>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <Box
          sx={{ padding: "10px" }}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            value={name}
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="name"
            autoComplete="username"
            onChange={handleName}
            onFocus={handleNameFocus}
            error={name ? !validName : false}
            inputRef={nameRef}
          />
          {nameFocus && !validName && name && (
            <Typography
              sx={{
                fontSize: "small",
                padding: "5px",
                margin: "0px",
                color: "red",
              }}
            >
              Please create your username.
            </Typography>
          )}
          {nameFocus && !name && isNameTyped && (
            <Typography
              sx={{
                fontSize: "small",
                padding: "5px",
                margin: "0px",
                color: "red",
              }}
            >
              Please ensure your password is 6-16 characters long, includes at
              least one uppercase letter, one lowercase letter, one number, and
              one special character, and does not start with a number.
            </Typography>
          )}

          <TextField
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="email address"
            name="email"
            autoComplete="email"
            onChange={handleUser}
            onFocus={handleUserFocus}
            error={email ? !validEmail : false}
            inputRef={userRef}
          />
          {userFocus && !validEmail && email && (
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
          {userFocus && !email && isEmailTyped && (
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
            value={password}
            margin="normal"
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
          <TextField
            margin="normal"
            value={matchPwd}
            required
            fullWidth
            id="matchPassword"
            type="password"
            label="confirm"
            name="matchPassword"
            onChange={handleMatchPwd}
            onFocus={handleMatchPwdFocus}
            error={matchPwd ? !isMatch : false}
            inputRef={matchPwdRef}
          />
          {matchPwd && !isMatch && (
            <Typography
              sx={{
                fontSize: "small",
                padding: "5px",
                margin: "0px",
                color: "red",
              }}
            >
              The password you entered does not match.
            </Typography>
          )}
          {isMatchTyped && !matchPwd && matchPwdFocus && (
            <Typography
              sx={{ fontSize: "small", padding: "5px", color: "red" }}
            >
              Password is required.
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                value="agree"
                color="primary"
                checked={privacyChecked}
                onChange={handlePrivacyCheck}
              />
            }
            label="I agree to the privacy policy"
          />
          {!privacyChecked && isNocheckSubmit && (
            <Typography
              sx={{
                fontSize: "small",
                padding: "5px",
                margin: "0px",
                color: "red",
              }}
            >
              You must agree to the privacy policy
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained">
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
