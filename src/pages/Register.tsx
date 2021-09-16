import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import {
  IFormInputs,
} from '../types/Auth';
import { useAuth } from '../contexts/AuthContext';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Password is required'),
})

export const Register: React.FC<IFormInputs> = () => {
  const { signUp } = useAuth();

  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const { isDirty, isValid } = formState

  return (
    <Container>
      <form onSubmit={handleSubmit(signUp)}>
        <FormControl>
          <TextField
            type="email"
            name="email"
            label="Email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            inputRef={register}
          />
          {errors.email && (
            <div>{errors.email.message}</div>
          )}
        </FormControl>
        <FormControl>
          <TextField
            type="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            variant="outlined"
            inputRef={register}
          />
          {errors.password && (
            <div>{errors.password.message}</div>
          )}
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!(isDirty && isValid)}
          >
            Register
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
