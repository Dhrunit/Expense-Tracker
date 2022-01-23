import React from "react";
import {
  rectangle,
  maleEmoji,
  maleEmoji1,
  femaleEmoji,
} from "../../assets/images";
import { Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const SplashScreen = ({ closeBackdrop, isMobile }) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/wallet");
    closeBackdrop(false);
  };
  if (isMobile) {
    return (
      <Paper
        sx={{
          margin: "0 auto",
          width: "90%",
          minHeight: "500px",
          maxHeight: "500px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Grid container>
          <Grid
            item
            xl={12}
            lg={12}
            sm={12}
            md={12}
            xs={12}
            alignItems={"center"}
            sx={{ textAlign: "center" }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontFamily: "soraExtraBold",
                marginBottom: "1rem",
              }}
            >
              WELCOME TO EXPENSE TRACKER
            </h1>
            <p
              style={{
                marginBottom: "1rem",
              }}
            >
              Thank you for registering on our platform. We help you keep your
              finance organised and also show the details in an elegant way 🚀.
              We hope that you enjoy our platform and if you have any queries
              then please see the FAQ in Profile section 😁
            </p>
            <Grid container spacing={2}>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                md={6}
                xs={6}
                alignItems={"center"}
              >
                <Button
                  styles={{ height: "3rem" }}
                  onClick={() => closeBackdrop(false)}
                >
                  Dismiss
                </Button>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                md={6}
                xs={6}
                alignItems={"center"}
              >
                <Button
                  type="contained"
                  styles={{ height: "3rem" }}
                  onClick={redirect}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return (
      <Paper
        sx={{
          margin: "0 auto",
          width: "60%",
          minHeight: "500px",
          maxHeight: "500px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <img
            src={rectangle}
            alt="rectangle"
            style={{ position: "absolute", left: 0, top: 0 }}
          />
          <Grid item xl={6} lg={6} sm={6} md={6} xs={6}>
            <img
              src={maleEmoji}
              alt="emoji"
              style={{
                position: "absolute",
                left: "0",
                top: "0",
              }}
            />
            <img
              src={maleEmoji1}
              alt="emoji"
              style={{
                position: "absolute",
                top: "70px",
                left: "170px",
              }}
            />
            <img
              src={femaleEmoji}
              alt="emoji"
              style={{
                position: "absolute",
                top: "200px",
                left: "50px",
              }}
            />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            sm={6}
            md={6}
            xs={6}
            alignItems={"center"}
            sx={{ paddingRight: "3rem" }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontFamily: "soraExtraBold",
                maxWidth: "300px",
                marginBottom: "1rem",
              }}
            >
              WELCOME TO EXPENSE TRACKER
            </h1>
            <p
              style={{
                marginBottom: "1rem",
              }}
            >
              Thank you for registering on our platform. We help you keep your
              finance organised and also show the details in an elegant way 🚀.
              We hope that you enjoy our platform and if you have any queries
              then please see the FAQ in Profile section 😁
            </p>
            <Grid container spacing={5}>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                md={6}
                xs={6}
                alignItems={"center"}
              >
                <Button
                  styles={{ height: "3rem" }}
                  onClick={() => closeBackdrop(false)}
                >
                  Dismiss
                </Button>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                md={6}
                xs={6}
                alignItems={"center"}
              >
                <Button
                  type="contained"
                  styles={{ height: "3rem" }}
                  onClick={redirect}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
};

export default SplashScreen;
