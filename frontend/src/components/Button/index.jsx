import React from "react";
import { PrimaryButton } from "./style";

const Button = ({ type, onClick, children, disabled }) => {
  if (type === "contained") {
    return (
      <PrimaryButton
        fullWidth
        variant="contained"
        onClick={!disabled && onClick}
      >
        <span style={{ textTransform: "none" }}>{children}</span>
      </PrimaryButton>
    );
  } else {
    <PrimaryButton
      disabled={disabled}
      fullWidth
      variant="outlined"
      onClick={onClick}
    >
      <span style={{ textTransform: "none" }}>{children}</span>
    </PrimaryButton>;
  }
};

export default Button;
