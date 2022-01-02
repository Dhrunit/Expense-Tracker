import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
