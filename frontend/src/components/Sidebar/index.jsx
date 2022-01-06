import React, { useState } from "react";
import {
  BrandDrawer,
  BrandSvgDrawer,
  StyledAppBar,
  StyledDrawer,
} from "./style";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import sidebarArray from "./helpers";
import getUserDetails from "../../utils/getUserDetails";
import Form from "../Form";
import { Link } from "react-router-dom";
const Sidebar = ({ collapsed, setCollapsed }) => {
  const [anchorEl, setAnchorEl] = useState(null);
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
  };
  return (
    <div>
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open={!collapsed}
        collapsed={collapsed}
      >
        <div style={{ marginTop: "1rem" }}>
          {collapsed && <BrandSvgDrawer />}
          {!collapsed && <BrandDrawer />}
        </div>
        <List>
          {sidebarArray.map((element, index) => (
            <ListItem button key={element.name} sx={{ height: "3.5rem" }}>
              <Link
                to={element.to}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: "55px",
                    marginLeft: !collapsed && "0.5rem",
                    transition: "all 0.2s",
                  }}
                >
                  {element.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={element.name} />}
              </Link>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
      <StyledAppBar position="static" elevation={0} collapsed={collapsed}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
          </IconButton>
          <div
            style={{
              display: "flex",
              marginRight: "4rem",
              alignItems: "center",
            }}
          >
            <Form
              type={"search"}
              placeHolder={"Search"}
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
            />
            <div
              style={{
                margin: "0 0.5rem 0.5rem 1.5rem",
                background: "#fff",
                borderRadius: "50%",
              }}
            >
              <Avatar
                alt={userDetails ? userDetails.email : "Test"}
                src={userDetails && userDetails.pictureUrl}
              />
            </div>
            <IconButton onClick={handleClick}>
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={logout}>logout</MenuItem>
            </Menu>
          </div>
        </div>
      </StyledAppBar>
    </div>
  );
};

export default Sidebar;

// responsive changes
