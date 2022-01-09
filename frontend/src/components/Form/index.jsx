import { FormControl, Grid, IconButton, OutlinedInput } from "@mui/material";
import { ErrorText } from "./style";
import React from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SearchIcon from "@mui/icons-material/Search";
const Form = ({
  type,
  name,
  value,
  onChange,
  label,
  placeHolder,
  error,
  errorText,
  passwordVisible = false,
  setPasswordVisible = false,
  disabled = false,
  customStyle = false,
  autoComplete = true,
}) => {
  if (type === "search") {
    return (
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          sx={{
            height: "2.5rem",
            background: "#fff",
            border: "none",
            fontSize: "12px",
            margin: "0",
          }}
          variant="primary"
          error={error}
          type={"text"}
          name={name}
          value={value}
          placeholder={placeHolder}
          startAdornment={<SearchIcon sx={{ color: "#979797" }} />}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <ErrorText>{errorText}</ErrorText>
      </FormControl>
    );
  }
  return (
    <>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <label style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              {label}
            </label>
            {type === "password" ? (
              <OutlinedInput
                sx={{ height: "3.2rem" }}
                variant="primary"
                error={error}
                type={passwordVisible ? "text" : "password"}
                name={name}
                value={value}
                placeholder={placeHolder}
                onChange={onChange}
                endAdornment={
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {!passwordVisible && (
                      <VisibilityOffOutlinedIcon sx={{ color: "#744FC2" }} />
                    )}
                    {passwordVisible && (
                      <RemoveRedEyeOutlinedIcon sx={{ color: "#744FC2" }} />
                    )}
                  </IconButton>
                }
                disabled={disabled}
                autoComplete={autoComplete}
              />
            ) : (
              <OutlinedInput
                sx={{ height: "3.2rem", ...customStyle }}
                variant="primary"
                error={error}
                type={type}
                name={name}
                value={value}
                placeholder={placeHolder}
                onChange={onChange}
                disabled={disabled}
                autoComplete={autoComplete}
              />
            )}

            <ErrorText>{errorText}</ErrorText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
