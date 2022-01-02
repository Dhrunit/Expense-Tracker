import { FormControl, Grid, OutlinedInput } from "@mui/material";
import { ErrorText } from "./style";
import React from "react";

const Form = ({
  type,
  name,
  value,
  onChange,
  label,
  placeHolder,
  error,
  errorText,
}) => {
  return (
    <>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <label style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              {label}
            </label>
            <OutlinedInput
              sx={{ height: "3.2rem" }}
              variant="primary"
              error={error}
              type={type}
              name={name}
              value={value}
              placeholder={placeHolder}
              onChange={onChange}
            />
            <ErrorText>{errorText}</ErrorText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
