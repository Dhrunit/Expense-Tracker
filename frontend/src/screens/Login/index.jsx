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
import { login } from "../../redux/actions/authActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loginUser = async () => {
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
    if (isEmail && password.trim().length >= 6) {
      setError([]);
      dispatch(login(email, password));
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
                Login
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
              <div
                style={{
                  textAlign: "right",
                  textDecoration: "underline",
                  margin: "1.5rem 0",
                  fontSize: "14px",
                }}
              >
                Forgot Password
              </div>
              <Button
                type="contained"
                onClick={loginUser}
                disabled={auth.loading}
              >
                {auth.loading ? <CircularProgress /> : "Sign In"}
              </Button>
              <div
                style={{
                  textAlign: "center",
                  margin: "1rem 0",
                  fontSize: "14px",
                }}
              >
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#000" }}>
                  Sign up here
                </Link>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </AuthContainer>
  );
}
