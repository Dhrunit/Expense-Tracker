import Button from "../../components/Button";
import Form from "../../components/Form";
import CircularProgress from "@mui/material/CircularProgress";

const ChangePasswordModalContent = ({
  password,
  setPassword,
  passwordVisible,
  setPasswordVisible,
  confirmPassword,
  setConfirmPassword,
  confirmPasswordVisible,
  setconfirmPasswordVisible,
  error,
}) => {
  return (
    <>
      <Form
        type={"password"}
        name="password"
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
        name="confirmPassword"
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
    </>
  );
};

const ChangePasswordDialogActions = ({ loading, onClick }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "flex-end", padding: "0 1rem" }}
    >
      <Button
        type="contained"
        styles={{ height: "2.75rem", width: "200px" }}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress style={{ width: "25px", height: "25px" }} />
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
};

export { ChangePasswordDialogActions, ChangePasswordModalContent };
