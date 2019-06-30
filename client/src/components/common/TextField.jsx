import React from "react";
import { TextField } from "@material-ui/core";

const Input = props => {
  const {
    label,
    type,
    name,
    value,
    onChange,
    error,
    errorText,
    required,
    disabled
  } = props;
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={errorText}
      margin='normal'
      variant='outlined'
      required={required}
      disabled={disabled}
      fullWidth
    />
  );
};

export default Input;
