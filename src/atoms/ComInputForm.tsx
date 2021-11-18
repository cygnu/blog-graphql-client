import React from "react";
import { FormControl, TextField } from "@mui/material";
import { css } from "@emotion/react";

const cFErr = css`
  text-align: start;
  color: red;
`

export const ComInputForm = ({ register, error, ...inputProps }: any) => {
  return (
    <FormControl fullWidth>
      <TextField variant="outlined" inputRef={register} {...inputProps} />
      {error && <div css={cFErr}>{error.message}</div>}
    </FormControl>
  );
};
