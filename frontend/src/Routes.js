import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { isRegistered } from "./redux/actions/authActions";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import Transactions from "./screens/Transactions";
import Wallet from "./screens/Wallet";
import getAuthToken from "./utils/getToken";

const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isRegistered());
  }, []);
  const [collapsed, setCollapsed] = useState(true);
  let token = getAuthToken();
  if (token) {
    return (
      <Router>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />;
        <Routes>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/wallet" element={<Wallet />} exact />
          <Route path="/transactions" element={<Transactions />} exact />
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
