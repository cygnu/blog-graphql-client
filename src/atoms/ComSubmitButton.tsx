import React from "react";
import { FormControl, Button } from "@mui/material";

export const ComSubmitButton = ({
  label,
  register,
  error,
  ...inputProps
}: any) => {
  return (
    <FormControl fullWidth>
      <Button type="submit" variant="contained" color="primary" {...inputProps}>
        {label}
      </Button>
    </FormControl>
  );
};
