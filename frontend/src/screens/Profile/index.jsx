import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContent } from "../../common/style";
import { useMediaQuery, useTheme } from "@mui/material";
import Button from "../../components/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DialogBox from "../../components/DialogBox";
import {
  ChangePasswordDialogActions,
  ChangePasswordModalContent,
} from "./helpers";
import Form from "../../components/Form";
import { changePasswordRequest } from "../../redux/actions/authActions";

const Profile = ({ isMobile, collapsed }) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const theme = useTheme();
  const isMobileSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const { userDetails } = useSelector((state) => state.auth);
  const changePassword = async () => {
    if (password.trim().length < 6) {
      setError((prevState) => [...prevState, "password"]);
    } else {
      setError(error.filter((err) => err !== "password"));
    }
    if (password !== confirmPassword) {
      setError((prevState) => [...prevState, "confirmPassword"]);
    }
    if (password.trim().length >= 6 && password === confirmPassword) {
      setError([]);
      dispatch(changePasswordRequest(password, setLoading));
    }
  };
  const closeDialog = () => {
    setChangePasswordModal(false);
    setError([]);
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <MainContent isMobile={isMobile} collapsed={collapsed}>
      <h2 style={{ margin: "1rem 0", fontFamily: "soraBold" }}>PROFILE</h2>
      <Grid container spacing={4} justifyContent={"space-between"}>
        <Grid item xl={7} lg={7} md={12} sm={12} xs={12}>
          <Paper
            elevation={3}
            sx={{ padding: "1rem 2rem", textAlign: "center" }}
          >
            <h3
              style={{
                margin: "0.5rem",
                fontFamily: "soraSemiBold",
              }}
            >
              User details
            </h3>
            <img
              style={{ width: "50%", marginBottom: "0.5rem" }}
              src={userDetails.pictureUrl}
              alt="profile_image"
            />
            <Form
              type={"text"}
              label={"Email"}
              placeHolder={"Your Email"}
              value={userDetails.email}
              disabled={true}
              customStyle={{ height: "3rem !important" }}
            />
            <div
              style={{
                maxWidth: isMobileSm ? "80%" : "25%",
                marginTop: "0.5rem",
              }}
            >
              <Button
                type="contained"
                styles={{ height: "3rem" }}
                onClick={() => setChangePasswordModal(!changePasswordModal)}
              >
                Change Password
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <h3
              style={{
                margin: "0.5rem 0.5rem 2rem 0.5rem",
                fontFamily: "soraSemiBold",
                textAlign: "center",
              }}
            >
              FAQ
            </h3>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>Who built this Web App?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ letterSpacing: "1px" }}>
                  My name is Dhrunit Prajapati, I am a MERN Stack developer and
                  an IT professional with one year of working experience
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>What technology this app use?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ letterSpacing: "1px" }}>
                  This application is based on the MERN stack and for UI
                  designing I have used Figma. more on the{" "}
                  <a
                    href="https://github.com/Dhrunit/Expense-Tracker"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>{" "}
                  repo
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>Can I use it in my phone?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ letterSpacing: "1px" }}>
                  Yes you can absolutely and you can also install this app on
                  your phone as this app is a PWA(Progressive web app). You can
                  do so by tapping on the three dot of settings on your browser
                  and you would see a install option
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>What is the future of this app?</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ letterSpacing: "1px" }}>
                  Well the plan is to make this project an open source project
                  or a project on which one can learn and understand the MERN
                  stack and how to structure MERN projects
                </div>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
      </Grid>
      <DialogBox
        onClose={closeDialog}
        open={changePasswordModal}
        title={"Change Password"}
        content={
          <ChangePasswordModalContent
            password={password}
            error={error}
            setPassword={setPassword}
            confirmPasswordVisible={confirmPasswordVisible}
            setconfirmPasswordVisible={setConfirmPasswordVisible}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
          />
        }
        dialogActionContent={
          <ChangePasswordDialogActions
            loading={loading}
            onClick={changePassword}
          />
        }
      />
    </MainContent>
  );
};

export default Profile;
