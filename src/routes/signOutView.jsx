import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../credentials";
import AuthProvider from "../components/AuthProvider";

const SignOutView = () => {
  const navigate = useNavigate();
  return (
    <AuthProvider
      onUserLoggedIn={async () => {
        await logOut();
        navigate("/login");
      }}
      onUserNotLoggedIn={() => {
        navigate("/login");
      }}
    ></AuthProvider>
  );
};

export default SignOutView;
