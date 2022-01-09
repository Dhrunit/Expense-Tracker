import React, { useState } from "react";
import getUserDetails from "../../utils/getUserDetails";
import LargeDevicesSidebar from "./LargeDevicesSidebar";
import { useNavigate } from "react-router-dom";
import SmallDevicesSidebar from "./SmallDevicesSidebar";
const Sidebar = ({ collapsed, setCollapsed, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const menuOpen = Boolean(anchorEl);
  const [search, setSearch] = useState("");
  let userDetails = getUserDetails();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  return isMobile ? (
    <SmallDevicesSidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      search={search}
      setSearch={setSearch}
      userDetails={userDetails}
      handleClick={handleClick}
      menuOpen={menuOpen}
      handleClose={handleClose}
      anchorEl={anchorEl}
      logout={logout}
    />
  ) : (
    <LargeDevicesSidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      search={search}
      setSearch={setSearch}
      userDetails={userDetails}
      handleClick={handleClick}
      menuOpen={menuOpen}
      handleClose={handleClose}
      anchorEl={anchorEl}
      logout={logout}
    />
  );
};

export default Sidebar;

// responsive changes
