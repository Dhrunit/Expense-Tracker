import { Grid, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyDataSvgImg } from "../../assets/images";
import Button from "../Button";

const EmptyContent = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={0} sx={{ marginTop: "5rem" }}>
      <Grid container>
        <EmptyDataSvgImg />
      </Grid>
      <div
        style={{ textAlign: "center", marginTop: "1.5rem", padding: "1rem" }}
      >
        Oops you have not used the potential of the platform, add a wallet and
        expenses to start things off
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button
          type="outlined"
          styles={{ width: "150px", height: "2.5rem" }}
          onClick={() => navigate("/wallet")}
        >
          Get Started
        </Button>
      </div>
    </Stack>
  );
};

export default EmptyContent;
