import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form";
import sidebarArray from "./helpers";
import {
  BrandDrawer,
  BrandSvgDrawer,
  StyledAppBar,
  StyledDrawer,
} from "./style";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LargeDevicesSidebar = ({
  collapsed,
  setCollapsed,
  search,
  setSearch,
  userDetails,
  handleClick,
  menuOpen,
  handleClose,
  anchorEl,
  logout,
}) => {
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon
                    sx={{
                      color: "#fff",
                      transition: "all 0.2s",
                      marginLeft: !collapsed ? "0.5rem" : "0.3rem",
                    }}
                  >
                    {element.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={element.name} />}
                </div>
              </Link>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
      <StyledAppBar position="fixed" elevation={0} collapsed={collapsed}>
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
              marginRight: "2.5rem",
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
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </StyledAppBar>
    </div>
  );
};

export default LargeDevicesSidebar;
