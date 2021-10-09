// Styles
import { Button } from "@mui/material";
import React from "react";
import "../assets/styles/login.css";
import logo from "../assets/img/discord-logo.png";
import { auth, provider } from "../firebase.js";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => console.log("Error", err));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="Discord Logo" />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
