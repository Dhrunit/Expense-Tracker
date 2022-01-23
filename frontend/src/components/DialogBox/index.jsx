import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const DialogBox = ({ onClose, open, title, content, dialogActionContent }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth={title === "Change Password" ? "sm" : "md"}
      fullWidth
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>{title}</h4>
          <IconButton>
            {" "}
            <CloseIcon
              sx={{ height: "1.5rem", width: "1.5rem" }}
              onClick={onClose}
            />
          </IconButton>
        </div>
      </DialogTitle>
      <div style={{ borderBottom: "2px solid #DCDCDC" }}></div>
      <DialogContent>{content}</DialogContent>
      <div style={{ borderBottom: "2px solid #DCDCDC" }}></div>
      <DialogActions>{dialogActionContent}</DialogActions>
    </Dialog>
  );
};

export default DialogBox;
