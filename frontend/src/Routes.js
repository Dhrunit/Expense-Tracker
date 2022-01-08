import { useMediaQuery, useTheme } from "@mui/material";
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
  }, [dispatch]);
  const [collapsed, setCollapsed] = useState(true);
  let token = getAuthToken();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (token) {
    return (
      <Router>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
        />
        <Routes>
          <Route
            path="/"
            element={<Dashboard collapsed={collapsed} isMobile={isMobile} />}
            exact
          />
          <Route
            path="/profile"
            element={<Profile collapsed={collapsed} isMobile={isMobile} />}
            exact
          />
          <Route
            path="/wallet"
            element={<Wallet collapsed={collapsed} isMobile={isMobile} />}
            exact
          />
          <Route
            path="/transactions"
            element={<Transactions collapsed={collapsed} isMobile={isMobile} />}
            exact
          />
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
