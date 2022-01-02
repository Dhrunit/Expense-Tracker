import React from "react";
import { PrimaryButton } from "./style";

const Button = ({ type, onClick, children }) => {
  if (type === "contained") {
    return (
      <PrimaryButton fullWidth variant="contained" onClick={onClick}>
        <span style={{ textTransform: "none" }}>{children}</span>
      </PrimaryButton>
    );
  } else {
    <PrimaryButton fullWidth variant="outlined" onClick={onClick}>
      <span style={{ textTransform: "none" }}>{children}</span>
    </PrimaryButton>;
  }
};

export default Button;
