import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
});

export const Authentication: React.FC = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
      </TabList>

      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  );
};

const TabComponent: React.FC = () => {
  const { signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const { isDirty, isValid } = formState

  return (
    <Container>
      <form onSubmit={isLogin ? handleSubmit(signIn) : handleSubmit(signUp)}>
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
        <FormControl>{isLogin ?
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!(isDirty && isValid)}
          >
            Login
          </Button>
        :
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!(isDirty && isValid)}
          >
            Register
          </Button>
        }</FormControl>
      </form>
    </Container>
  );
};
