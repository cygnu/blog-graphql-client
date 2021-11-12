import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Container } from "@mui/material";
import { IFormInputs, User, IAuthProps, IContext } from "../types/Auth";
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

const AuthContext = createContext<IContext>({} as IContext);

export const useAuth = () => useContext(AuthContext);

export const Authentication: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser] = useMutation(CREATE_USER);
  const [getToken] = useMutation(GET_TOKEN);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const storageItem = localStorage.getItem("token");
    if (storageItem) {
      const jwtDecodedToken = jwtDecode<User>(storageItem);
      if (jwtDecodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        setCurrentUser(jwtDecodedToken);
      }
    }
  }, []);

  const onSubmit = async (data: IFormInputs, e: any) => {
    e.preventDefault();

    if (tabIndex === 0) {
      const result = await getToken({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      localStorage.setItem("token", result.data.tokenAuth.token);
      result.data.tokenAuth.token && (window.location.href = "/");
    } else if (tabIndex === 1) {
      await createUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      const result = await getToken({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      localStorage.setItem("token", result.data.tokenAuth.token);
      result.data.tokenAuth.token && (window.location.href = "/");
    } else {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        currentUser,
        onSubmit,
      }}
    >
      <Tabs selectedIndex={tabIndex} onSelect={(tabIndex) => setTabIndex(tabIndex)}>
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
    </AuthContext.Provider>
  );
};

const TabComponent: React.FC<IAuthProps> = ({ label }) => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;

  const { email, setEmail, password, setPassword, onSubmit } = useAuth();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
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
