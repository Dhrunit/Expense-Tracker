import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import getAuthToken from "./utils/getToken";

const AppRoutes = () => {
  let token = getAuthToken();
  if (token) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} exact />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
        </Routes>
      </Router>
    );
  }
};

export default AppRoutes;
