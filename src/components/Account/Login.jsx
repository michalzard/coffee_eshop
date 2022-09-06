import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "../../styles/components/Account/Login.scss";
import axios from "axios";
import { BASE_URI } from "../../lib/base_uri";
import { UserLogin, UserRegistration } from "../../controllers/store/reducers/authReducers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../../controllers/store/store";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginErrors,setLoginErrors] = useState(null);
  const [registerErrors,setRegisterErrors] = useState(null);
  const dispatch = useDispatch();
  const isLoginFilled = () => {
    return loginUsername.length > 0 && loginPassword.length > 0;
  };
  const isRegisterFilled = () => {
    return (
      registerUsername.length > 0 &&
      registerEmail.length > 0 &&
      registerPassword.length > 0
    );
  };

  const submitLogin = () => {
    if(loginUsername.length === 0 || loginPassword.length === 0) return;
    dispatch(UserLogin({username:loginUsername,password:loginPassword})); 
  };
  const submitRegister = () => {
    if(registerUsername.length === 0 || registerEmail.length === 0 || registerPassword.length === 0) return;
    axios.post(`${BASE_URI}/auth/register`, {
        name: registerUsername,
        email: registerEmail,
        password: registerPassword,
      },{
        withCredentials:true,
      })
      .then((data) => {
        const {user} = data.data;
        if(user) {
        dispatch(UserRegistration({username:registerUsername,email:registerEmail,password:registerPassword}));
        }
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
      })
      .catch((err) =>{
        const {data} = err.response;
        if(data.message){
          setRegisterErrors(data.message);
        } 
      });
  };
  store.subscribe(()=>{
    const loginErrorMessage = store.getState().authState.error.login;
    setLoginErrors(loginErrorMessage);
  })
  
  return (
    <section className="auth_container">
      <Typography variant="h2" gutterBottom>
        My Account
      </Typography>
      <form>
        <section className="login">
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          
          <TextField
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Typography color="red">{loginErrors}</Typography>
          <Button
            variant="contained"
            onClick={submitLogin}
            disabled={isLoginFilled() ? false : true}
          >
            Login
          </Button>
          <Typography>Forgot password?</Typography>
        </section>

        <section className="register">
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <TextField
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <TextField
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <Typography color="red">{registerErrors}</Typography>
          <Button
            variant="contained"
            onClick={submitRegister}
            disabled={isRegisterFilled() ? false : true}
          >
            Register
          </Button>
        </section>
      </form>
    </section>
  );
}

export default Login;
