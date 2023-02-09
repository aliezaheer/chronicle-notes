import React, { useState } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import createUser from "../api/api";

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

const initialValue = {
  fullname: "",
  username: "",
  password: "",
};

const logoImg = "https://cdn-icons-png.flaticon.com/512/881/881760.png";

const Login = () => {
  const [signUp, setSignUp] = useState(initialValue);
  const [account, toggleAccount] = useState("login");

  const signupUserHandler = () => {
    createUser();
  };

  const signUpHandler = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
    console.log({ ...signUp, [e.target.name]: e.target.value });
  };

  const toggleSighup = () => {
    toggleAccount("signup");
  };

  return (
    <Container>
      <Box>
        <Logo src={logoImg} alt="login" />
        {account === "login" ? (
          <InnerWarpper>
            <TextField placeholder="username" />
            <TextField placeholder="password" />
            <Button variant="contained"> Login </Button>
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
            <Button variant="contained" onClick={signupUserHandler}>
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
