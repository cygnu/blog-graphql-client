import React from "react";
import { FormControl, TextField } from "@mui/material";

export const ComInputForm = ({ register, error, ...inputProps }: any) => {
  return (
    <FormControl>
      <TextField variant="outlined" inputRef={register} {...inputProps} />
      {error && <div>{error.message}</div>}
    </FormControl>
  );
};
