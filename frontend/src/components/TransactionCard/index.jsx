import { Grid, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TransactionCard = ({ category, title, note, amount, type, currency }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper sx={{ p: 2, position: "relative" }}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <div
        style={{
          backgroundColor: "#744FC2",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem auto",
        }}
      >
        {category}
      </div>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>{title}</h3>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>{note}</p>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        {type === "expense" ? (
          <span style={{ color: "red" }}>
            {" "}
            - {amount}
            {currency}
          </span>
        ) : (
          <span style={{ color: "green" }}>
            {" "}
            + {amount}
            {currency}
          </span>
        )}
      </p>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>"Edit"</MenuItem>
        <MenuItem>"Delete"</MenuItem>
      </Menu>
    </Paper>
  );
};

export default TransactionCard;
