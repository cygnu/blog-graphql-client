import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Container } from "@mui/material";
import { IFormInputs, IAuthPageContext } from "../types/Auth";
import { ComInputForm } from "../atoms/ComInputForm";
import { ComSubmitButton } from "../atoms/ComSubmitButton";
import { useAuth } from "../contexts/AuthContext";
import { css } from "@emotion/react";

const containerTabs = css`
  margin: 15vh auto 0;
  text-align: center;
  width: 70%;
`

const containerForm = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 480px) {
    max-width: 480px;
  }
`

const cFEmail = css`
  margin-top: 0.5em;
`

const cFPassword = css`
  margin-top: 0.5em;
`

const cFSubmit = css`
  margin-top: 30px;
  margin-bottom: 0.5em;
`

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .required("Password is required"),
});

const AuthPageContext = createContext<IAuthPageContext>({} as IAuthPageContext);

export const Authentication: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <AuthPageContext.Provider
      value={{
        tabIndex,
      }}
    >
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(tabIndex) => setTabIndex(tabIndex)}
        css={containerTabs}
      >
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanel>
          <TabComponent />
        </TabPanel>
        <TabPanel>
          <TabComponent />
        </TabPanel>
      </Tabs>
    </AuthPageContext.Provider>
  );
};

const TabComponent: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;

  const { tabIndex } = useContext(AuthPageContext);
  const { signIn, signUp } = useAuth();

  const onSubmit = () => {
    if (tabIndex === 0) {
      handleSubmit(signIn);
    } else if (tabIndex === 1) {
      handleSubmit(signUp);
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit} css={containerForm}>
        <ComInputForm
          required
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          autoFocus
          register={register}
          error={errors.email}
          css={cFEmail}
        />
        <ComInputForm
          required
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          register={register}
          error={errors.password}
          css={cFPassword}
        />
        <ComSubmitButton
          label={
          (tabIndex === 0)
            ? "Login"
            : "Register"
          }
          disabled={!(isDirty && isValid)}
          css={cFSubmit}
        />
      </form>
    </Container>
  );
};
