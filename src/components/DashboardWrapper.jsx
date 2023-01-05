import React from "react";
import { Link } from "react-router-dom";

const DashboardWrapper = ({ children }) => {
  return (
    <div>
      <nav>
        <div className="">Logotipo</div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/signout">signout</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default DashboardWrapper;
