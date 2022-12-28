import { onAuthStateChanged, getAuth } from "firebase/auth";

import { userExist, auth } from "../../credentials";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotRegistered,
  onUserNotLoggedIn,
}) => {
  const navigate = useNavigate();
  /*  const [curresntSate, setCurresntSate] = useState(0); */

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const isRegistered = userExist(user.uid);
        if (isRegistered) {
          onUserLoggedIn(user);
        } else {
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div>{children}</div>;
};

export default AuthProvider;
