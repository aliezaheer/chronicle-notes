import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField, styled, Typography } from "@mui/material";

import { API } from "../api/api";
import { DataContext } from "../context/DataProvider";

const Container = styled(Box)`
  width: 400px;
  margin: 10% auto 0 auto;

  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 3px;
`;

const Logo = styled("img")`
  width: 100px;
  margin: auto;
  display: flex;
  padding: 50px 0 0 0;
`;

const InnerWarpper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  & > div,
  & > button {
    margin: 8px 0 20px 0;
  }
`;

const Error = styled(Typography)`
  font-size: 14px;
  color: #ff9499;
  line-height: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const initialValue = {
  fullname: "",
  username: "",
  password: "",
};

const loginInitialState = {
  username: "",
  password: "",
};

const logoImg = "https://cdn-icons-png.flaticon.com/512/881/881760.png";

const Login = () => {
  const [signUp, setSignUp] = useState(initialValue);
  const [account, toggleAccount] = useState("login");
  const [login, setLogin] = useState(loginInitialState);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const signUpHandler = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const toggleSighup = () => {
    toggleAccount("signup");
  };

  const signupUserHandler = async () => {
    let response = await API.userSignup(signUp);
    if (response.isSuccess) {
      setError("");
      setSignUp(initialValue);
      toggleAccount("login");
    } else {
      setError("Something went wrong. Please again late.");
    }
  };

  const onLoginHandler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    console.log(response);

    if (response.isSuccess) {
      setError(null);

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        fullname: response.data.fullname,
      });

      navigate("/");
    } else {
      setError("Something is wrong. Please try again later.");
    }
  };

  return (
    <Container>
      <Box>
        <Logo src={logoImg} alt="login" />
        {account === "login" ? (
          <InnerWarpper>
            <TextField
              placeholder="username"
              name="username"
              value={login.username}
              onChange={(e) => onLoginHandler(e)}
            />
            <TextField
              placeholder="password"
              name="password"
              value={login.password}
              onChange={(e) => onLoginHandler(e)}
            />
            {error && <Error>{error}</Error>}
            <Button
              variant="contained"
              onClick={() => {
                loginUser();
              }}
            >
              Login
            </Button>
            <Button variant="outlined" onClick={() => toggleSighup()}>
              Create An Account
            </Button>
          </InnerWarpper>
        ) : (
          <InnerWarpper>
            <TextField
              onChange={(e) => signUpHandler(e)}
              placeholder="Full Name"
              name="fullname"
            />
            <TextField
              onChange={(e) => signUpHandler(e)}
              placeholder="username"
              name="username"
            />
            <TextField
              onChange={(e) => signUpHandler(e)}
              placeholder="password"
              name="password"
              type="password"
            />
            {error && <Error>{error}</Error>}

            <Button variant="contained" onClick={() => signupUserHandler}>
              Signup
            </Button>
            <Button variant="outlined" onClick={() => toggleAccount("login")}>
              Already Have An Account?
            </Button>
          </InnerWarpper>
        )}
      </Box>
    </Container>
  );
};

export default Login;
