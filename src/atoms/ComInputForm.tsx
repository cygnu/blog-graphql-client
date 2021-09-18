import React from 'react';
import {
  FormControl,
  TextField,
} from '@material-ui/core';

// @ts-ignore
export const ComInputForm = ({ register, error, ...inputProps }) => {
  return (
    <FormControl>
      <TextField
        type="input"
        variant="outlined"
        inputRef={register}
        { ...inputProps }
      />
      {error && (
        <div>{error.message}</div>
      )}
    </FormControl>
  );
};
