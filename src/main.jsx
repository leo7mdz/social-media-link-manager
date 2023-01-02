import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ChooseUserNameView from "./routes/chooseUserNameView";
import DashboardView from "./routes/dashboardView";
import LoginView from "./routes/loginView";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={"/login"} element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/choose-username" element={<ChooseUserNameView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
