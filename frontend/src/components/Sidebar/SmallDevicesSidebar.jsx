import React from "react";
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
import { Link } from "react-router-dom";
import Form from "../Form";
import sidebarArray from "./helpers";
import {
  BrandDrawerMobile,
  StyledAppBarMobile,
  StyledDrawerMobile,
} from "./style";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SmallDevicesSidebar = ({
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
      <StyledDrawerMobile
        variant="temporary"
        sx={{
          display: { md: "block", sm: "block", xs: "block" },
        }}
        open={!collapsed}
        collapsed={collapsed}
        onClose={() => setCollapsed(true)}
      >
        <div style={{ marginTop: "1rem" }}>
          {!collapsed && <BrandDrawerMobile />}
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
                      marginLeft: !collapsed && "0.3rem",
                      minWidth: "45px",
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
      </StyledDrawerMobile>
      <StyledAppBarMobile position="fixed" elevation={0} collapsed={collapsed}>
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
              marginRight: "1rem",
              alignItems: "center",
            }}
          >
            <Form
              type={"search"}
              name="search"
              placeHolder={"Search"}
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              autoComplete={false}
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
      </StyledAppBarMobile>
    </div>
  );
};

export default SmallDevicesSidebar;
