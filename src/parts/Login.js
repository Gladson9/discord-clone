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

  const signInGuest = () => {
    auth
      .signInWithEmailAndPassword("guest@discord.com", "guest@discord")
      .catch((err) => console.log("Signin Error", err));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="Discord Logo" />
      </div>
      <div className="login__btns">
        <Button onClick={signIn}>Sign In</Button>
        <Button onClick={signInGuest}>Log In as guest</Button>
      </div>
    </div>
  );
};

export default Login;
