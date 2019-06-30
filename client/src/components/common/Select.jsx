import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

const Select = props => {
  const { label, name, value, onChange, error, errorText, options } = props;
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={errorText}
      select
      margin='normal'
      variant='outlined'
      required
      fullWidth
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
