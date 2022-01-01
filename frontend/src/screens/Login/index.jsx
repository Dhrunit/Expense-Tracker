import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AuthContainer,
  BrandHeading,
  BrandSvgImage,
} from "../../common/style/index";
import Card from "../../components/Card";
import Form from "../../components/Form";

export default function Login() {
  const [email, setEmail] = useState("");
  return (
    <AuthContainer>
      <BrandHeading>
        Expense Tracker
        <BrandSvgImage />
      </BrandHeading>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <h1
            style={{
              fontFamily: "soraExtraBold",
              margin: "1.5rem",
              fontSize: "25px",
            }}
          >
            Login
          </h1>
          <div style={{ width: "100%" }}>
            <Form />
          </div>
        </Card>
      </div>
    </AuthContainer>
  );
}
