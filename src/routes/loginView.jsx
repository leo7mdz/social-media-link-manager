import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import firebaseApp from "../../credentials";
import AuthProvider from "../components/AuthProvider";
const auth = getAuth(firebaseApp);

const LoginView = () => {
  const [currentuser, setCurrentuser] = useState(null);
  /* 0:inicializado
     1:loading 
     2:login completo 
     3:login pero sin registro 
     4:no se encuentra logueado */

  const [currentState, setCurrentState] = useState(0);

  const handleClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserLoggedIn = (user) => {};

  const handleUserNotRegistered = () => {};

  const handleUserNotLoggedIn = () => {};

  if (currentState === 2) {
    return <div>Estas autenticado y registrado</div>;
  }

  if (currentState === 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }

  if (currentState === 4) {
    return (
      <div>
        <button onClick={handleClick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>...Loading</div>
    </AuthProvider>
  );
};

export default LoginView;
