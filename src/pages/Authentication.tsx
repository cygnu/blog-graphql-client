import React from 'react';
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
  const { signIn, signUp } = useAuth();

  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Register</Tab>
      </TabList>

      <TabPanel>
        <TabComponent
          submitting={signIn}
          title="Login"
        />
      </TabPanel>
      <TabPanel>
        <TabComponent
          submitting={signUp}
          title="Register"
        />
      </TabPanel>
    </Tabs>
  );
};

type IAuthProps = {
  submitting: (data: IFormInputs) => Promise<void>;
  title: string;
}

const TabComponent: React.FC<IAuthProps> = ({ submitting, title }) => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const { isDirty, isValid } = formState

  return (
    <Container>
      <form onSubmit={handleSubmit(submitting)}>
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
            {title}
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
