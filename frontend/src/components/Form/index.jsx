import {
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";

const Form = ({
  type,
  name,
  value,
  onChange,
  required,
  label,
  placeHolder,
  error,
}) => {
  return (
    <>
      <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="name">{placeHolder}</InputLabel>
        <OutlinedInput
          variant="secondary"
          error={error}
          type={type}
          id={name}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};

export default Form;
