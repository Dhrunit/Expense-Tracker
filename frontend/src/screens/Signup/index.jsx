import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AuthContainer,
  BrandHeading,
  BrandSvgImage,
} from "../../common/style/index";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Form from "../../components/Form";
import { validateEmail } from "../../utils/validateEmail";
import { register } from "../../redux/actions/authActions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const signupUser = async () => {
    let isEmail = validateEmail(email);
    if (!isEmail) {
      setError((prevState) => [...prevState, "email"]);
    } else {
      setError(error.filter((err) => err !== "email"));
    }
    if (password.trim().length < 6) {
      setError((prevState) => [...prevState, "password"]);
    } else {
      setError(error.filter((err) => err !== "password"));
    }
    if (password !== confirmPassword) {
      setError((prevState) => [...prevState, "confirmPassword"]);
    }
    if (
      isEmail &&
      password.trim().length >= 6 &&
      password === confirmPassword
    ) {
      setError([]);
      dispatch(register(email, password));
    }
  };
  return (
    <AuthContainer>
      <BrandHeading>
        Expense Tracker
        <BrandSvgImage />
      </BrandHeading>
      <Grid justifyContent={"center"} container>
        <Grid item xs={10} lg={4}>
          <Card>
            <div style={{ margin: "2rem" }}>
              <h1
                style={{
                  fontFamily: "soraExtraBold",
                  fontSize: "22px",
                }}
              >
                Signup
              </h1>
              <Form
                type={"text"}
                label={"Email"}
                placeHolder={"Your Email"}
                value={email}
                error={error.includes("email")}
                onChange={(evt) => setEmail(evt.target.value)}
                errorText={error.includes("email") && "Email is invalid"}
              />
              <Form
                type={"password"}
                label={"Password"}
                placeHolder={"Enter your password"}
                value={password}
                error={error.includes("password")}
                onChange={(evt) => setPassword(evt.target.value)}
                errorText={
                  error.includes("password") &&
                  "Password should be minimum of 6 characters"
                }
                passwordVisible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
              <Form
                type={"password"}
                label={"Confirm Password"}
                placeHolder={"Confirm password"}
                value={confirmPassword}
                error={error.includes("confirmPassword")}
                onChange={(evt) => setConfirmPassword(evt.target.value)}
                errorText={
                  error.includes("confirmPassword") &&
                  "Password and confirm password do not match"
                }
                passwordVisible={confirmPasswordVisible}
                setPasswordVisible={setconfirmPasswordVisible}
              />
              <Button
                type="contained"
                onClick={signupUser}
                disabled={auth.loading}
              >
                {auth.loading ? <CircularProgress /> : "Sign Up"}
              </Button>
              <div
                style={{
                  textAlign: "center",
                  margin: "1rem 0",
                  fontSize: "14px",
                }}
              >
                Already have an account?{" "}
                <Link to="/" style={{ color: "#000" }}>
                  Login here
                </Link>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </AuthContainer>
  );
}
