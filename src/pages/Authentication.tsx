import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Container } from "@mui/material";
import { IFormInputs, IAuthProps } from "../types/Auth";
import { ComInputForm } from "../atoms/ComInputForm";
import { ComSubmitButton } from "../atoms/ComSubmitButton";
import { useAuth } from "../contexts/AuthContext";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .required("Password is required"),
});

type SelectTabProps = {
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const SelectTabIndex = createContext<SelectTabProps>(
  {} as SelectTabProps
);

export const Authentication: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <SelectTabIndex.Provider
      value={{
        tabIndex,
        setTabIndex,
      }}
    >
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanel>
          <TabComponent label="Login" />
        </TabPanel>
        <TabPanel>
          <TabComponent label="Register" />
        </TabPanel>
      </Tabs>
    </SelectTabIndex.Provider>
  );
};

const TabComponent: React.FC<IAuthProps> = ({ label }) => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;
  const { signIn, signUp } = useAuth();
  const { tabIndex } = useContext(SelectTabIndex);

  return (
    <Container>
      <form
        onSubmit={
          tabIndex === 0
            ? handleSubmit(() => signIn)
            : handleSubmit(() => signUp)
        }
      >
        <ComInputForm
          required
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          autoFocus
          register={register}
          error={errors.email}
        />
        <ComInputForm
          required
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          register={register}
          error={errors.password}
        />
        <ComSubmitButton label={label} disabled={!(isDirty && isValid)} />
      </form>
    </Container>
  );
};
