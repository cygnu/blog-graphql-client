import React from "react";
import { FormControl } from "@mui/material";
import { css } from "@emotion/react";

const cFInputFile = css`
  align-items: start;
  width: 100%;
`

export const ComInputFile = ({ register, error, ...inputProps }: any) => {
  return (
    <FormControl css={cFInputFile}>
      <input type="file" ref={register} {...inputProps} />
      {error && <div>{error.message}</div>}
    </FormControl>
  );
};
