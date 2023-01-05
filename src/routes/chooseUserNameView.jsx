import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { existUserName, updateUser } from "../../credentials";
import AuthProvider from "../components/AuthProvider";

const ChooseUserNameView = () => {
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setCurrentState(3);
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleContinue = async () => {
    if (username !== "") {
      const exists = await existUserName(username);
      if (exists) {
        setCurrentState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;

        await updateUser(tmp);

        setCurrentState(6);
      }
    }
  };

  if (currentState === 3 || currentState === 5) {
    return (
      <div>
        <h4>Bienvenido {currentUser.displayName}</h4>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {currentState === 5 && (
          <p>El nombre de usuario ya existe escoge otro</p>
        )}
        <div>
          <input type="text" onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  }

  if (currentState === 6) {
    return (
      <div>
        <h3>Felicidades, ya puedes ir al dashboard a crear tus links!</h3>
        <Link to="/dashboard">Continuar</Link>
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

export default ChooseUserNameView;
