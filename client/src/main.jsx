import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router"; // Import Navigate
import "./index.css";
import App from "./App.jsx";

import { Register, Login, Dashboard, SelfPickUp } from "./pages";
import DashbaordLayout from "./components/DashbaordLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashbaordLayout />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="self-pick-up" element={<SelfPickUp />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>
);
