import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

const Input = props => {
  const {
    label,
    name,
    value,
    onChange,
    error,
    errorText,
    icon,
    placeholder
  } = props;
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={errorText}
      placeholder={placeholder}
      margin='normal'
      variant='outlined'
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <i className={icon} />
          </InputAdornment>
        )
      }}
    />
  );
};

export default Input;
