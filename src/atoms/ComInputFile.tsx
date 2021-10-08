import React from "react";
import { FormControl } from "@mui/material";

export const ComInputFile = ({ register, error, ...inputProps }: any) => {
  return (
    <FormControl>
      <input type="file" ref={register} {...inputProps} />
      {error && <div>{error.message}</div>}
    </FormControl>
  );
};
