import React from "react";
import { PrimaryButton } from "./style";

const Button = ({ type, onClick, children, disabled, styles }) => {
  if (type === "contained") {
    return (
      <PrimaryButton
        fullWidth
        variant="contained"
        onClick={!disabled && onClick}
        sx={styles}
      >
        <span style={{ textTransform: "none" }}>{children}</span>
      </PrimaryButton>
    );
  } else {
    return (
      <PrimaryButton
        disabled={disabled}
        fullWidth
        variant="outlined"
        onClick={onClick}
        sx={styles}
      >
        <span style={{ textTransform: "none" }}>{children}</span>
      </PrimaryButton>
    );
  }
};

export default Button;
