import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TransactionCard = ({
  id,
  categoryIcon,
  category,
  title,
  note,
  amount,
  type,
  currency,
  onEdit,
  onDelete,
  individualLoader,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper sx={{ p: 2, position: "relative" }} elevation={4}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Tooltip title={category}>
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
          {categoryIcon}
        </div>
      </Tooltip>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {title.length > 20 ? title.substring(0, 20) + "..." : title}
      </h3>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        {note.length > 20 ? note.substring(0, 20) + "..." : note}
      </p>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        {type === "expense" ? (
          <span style={{ color: "red" }}>
            - {amount}
            {currency}
          </span>
        ) : (
          <span style={{ color: "green" }}>
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
        <MenuItem onClick={() => onEdit(id)}>
          {individualLoader ? <CircularProgress color="primary" /> : "Edit"}
        </MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </Paper>
  );
};

export default TransactionCard;
