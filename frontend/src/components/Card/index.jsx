import React from "react";
import { AuthCard } from "./style";

const Card = ({ children }) => {
  return <AuthCard elevation={4}>{children}</AuthCard>;
};

export default Card;
