import "./App.css";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import LoginView from "./routes/loginView";
import PublicProfileView from "./routes/publicProfileView";
import ChooseUserNameView from "./routes/chooseUserNameView";
import DashboardView from "./routes/dashboardView";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/choose-username" element={<ChooseUserNameView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
