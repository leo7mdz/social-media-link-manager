import React, { useState } from "react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../credentials";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";

const LoginView = () => {
  const [currentuser, setCurrentuser] = useState(null);
  /* 0:inicializado
     1:loading 
     2:login completo 
     3:login pero sin registro 
     4:no se encuentra logueado
     5:Ya existe userName
     6: Nuevo userName , click para continuar*/

  const [currentState, setCurrentState] = useState(0);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    navigate("/choose-username");
  };

  const handleUserNotLoggedIn = () => {
    setCurrentState(4);
  };

  if (currentState === 4) {
    return (
      <div className={style.loginView}>
        <h2>Link tree</h2>
        <button className={style.provider} onClick={handleClick}>
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      ...Loading
    </AuthProvider>
  );
};

export default LoginView;
