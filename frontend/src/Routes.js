import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
