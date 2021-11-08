import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Container } from "@mui/material";
import { IFormInputs, IAuthProps } from "../types/Auth";
import { ComInputForm } from "../atoms/ComInputForm";
import { ComSubmitButton } from "../atoms/ComSubmitButton";
import { CREATE_USER, GET_TOKEN } from "../graphql/mutations";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser] = useMutation(CREATE_USER);
  const [getToken] = useMutation(GET_TOKEN);

  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;
  const { tabIndex } = useContext(SelectTabIndex);

  useEffect(() => {
    const storageItem = localStorage.getItem("token");
    if (storageItem) {
      const jwtDecodedToken = jwtDecode(storageItem);
      // @ts-ignore
      if (jwtDecodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        window.location.href = "/";
      }
    }
  }, []);

  const onSubmit = handleSubmit(async (data, e: any) => {
    e.preventDefault();

    if (tabIndex === 0) {
      const result = await getToken({
        variables: { email: email, password: password },
      });
      localStorage.setItem("token", result.data.tokenAuth.token);
      result.data.tokenAuth.token && (window.location.href = "/");
    } else {
      await createUser({
        variables: { email: email, password: password },
      });
      const result = await getToken({
        variables: { email: email, password: password },
      });
      localStorage.setItem("token", result.data.tokenAuth.token);
      result.data.tokenAuth.token && (window.location.href = "/");
    }
  });

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <ComInputForm
          required
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          autoFocus
          register={register}
          error={errors.email}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <ComInputForm
          required
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          register={register}
          error={errors.password}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <ComSubmitButton label={label} disabled={!(isDirty && isValid)} />
      </form>
    </Container>
  );
};
