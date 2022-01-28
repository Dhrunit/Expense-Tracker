import React, { useState } from "react";
import { cardEllipse } from "../../assets/images";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { CreditCardSvg } from "../../assets/icons";

const WalletCard = ({
  id,
  walletName,
  onDelete,
  onEdit,
  description,
  resetPeriod,
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
    <div
      style={{
        border: "1px solid #C1D4D7",
        background: "#F6F9F9",
        borderRadius: "5px",
        minHeight: "210px",
        maxWidth: "400px",
        position: "relative",
        margin: "0.5rem",
      }}
    >
      <img
        src={cardEllipse}
        alt="ellipse"
        style={{ position: "absolute", right: 0, width: "50%" }}
      />
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <img src={CreditCardSvg} alt="wallet-icon" style={{ margin: "1rem" }} />
      <Stack style={{ padding: "0 1.5rem" }} spacing={1}>
        <h2>{walletName}</h2>
        <p style={{ color: description === "Active" ? "green" : "red" }}>
          {description}
        </p>
        <p>
          <span style={{ fontFamily: "soraBold" }}>Reset period:</span>{" "}
          {resetPeriod ? resetPeriod : "No reset period set"}
        </p>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => !individualLoader && onEdit(id)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => !individualLoader && onDelete(id)}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default WalletCard;
