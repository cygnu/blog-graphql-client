import React from 'react';
import {
  FormControl,
  TextField,
} from '@material-ui/core';

export const ComInputForm = ({ register, error, ...inputProps }: any) => {
  return (
    <FormControl>
      <TextField
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
