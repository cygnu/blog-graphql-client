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
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
      </TabList>

      <TabPanel>
        <TabComponent
          submit={signIn}
          title="Login"
        />
      </TabPanel>
      <TabPanel>
        <TabComponent
          submit={signUp}
          title="Register"
        />
      </TabPanel>
    </Tabs>
  );
};

const TabComponent: React.FC = (props: any) => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const { isDirty, isValid } = formState

  return (
    <Container>
      <form onSubmit={handleSubmit(props.submit)}>
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
            {props.title}
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
