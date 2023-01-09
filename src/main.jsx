import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ChooseUserNameView from "./routes/chooseUserNameView";
import DashboardView from "./routes/dashboardView";
import LoginView from "./routes/loginView";
import "./index.css";
import SignOutView from "./routes/signOutView";
import EditProfileView from "./routes/editProfileView";
import PublicProfileView from "./routes/publicProfileView";
import NotFound from "./routes/notFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginView />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="dashboard/profile" element={<EditProfileView />} />
        <Route path="signout" element={<SignOutView />} />
        <Route path="users/:username" element={<PublicProfileView />} />
        <Route path="choose-username" element={<ChooseUserNameView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
