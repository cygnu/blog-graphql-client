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
  Button,
} from '@material-ui/core';
import {
  IFormInputs,
  IAuthProps,
} from '../types/Auth';
import { ComInputForm } from '../atoms/ComInputForm';
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

const TabComponent: React.FC<IAuthProps> = ({ submitting, title }) => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const { isDirty, isValid } = formState

  return (
    <Container>
      <form onSubmit={handleSubmit(submitting)}>
        <ComInputForm
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          autoFocus
          register={register}
          error={errors.email}
        />
        <ComInputForm
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          register={register}
          error={errors.password}
        />
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
