import React from "react";
import { FormControl, Button } from "@mui/material";
import { css } from "@emotion/react";

const cFSubmitButton = css`
  width: 100%;
  @media (min-width: 480px) {
    max-width: 480px;
  }
`

export const ComSubmitButton = ({
  label,
  register,
  error,
  ...inputProps
}: any) => {
  return (
    <FormControl fullWidth css={cFSubmitButton}>
      <Button type="submit" variant="contained" color="primary" {...inputProps}>
        {label}
      </Button>
    </FormControl>
  );
};
