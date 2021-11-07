import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

export const Authentication: React.FC<IAuthProps> = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;
  const { signIn } = useAuth();

  return (
    <Container>
      <form onSubmit={handleSubmit(signIn)}>
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
        <ComSubmitButton label="login" disabled={!(isDirty && isValid)} />
      </form>
    </Container>
  );
};
