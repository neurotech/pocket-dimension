import React, { useState } from "react";
import { useStore } from "../../util/Store.js";
import { login } from "../../util/asyncActions.js";
import {
  LOGIN,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
} from "../../util/actionTypes";
import styled from "styled-components";
import { Input } from "../ui/Input.js";

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.loginFormContainerBackground};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const LoginForm = () => {
  const { state, dispatch } = useStore();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmitLogin = async (event, username, password) => {
    event.preventDefault();
    if (!sessionStorage.getItem("token")) {
      setError(null);

      dispatch({ type: SET_IS_LOADING_ON });
      let response = await login(username, password);
      dispatch({ type: SET_IS_LOADING_OFF });

      if (response.token) {
        sessionStorage.setItem("token", response.token);
        dispatch({ type: LOGIN, payload: response.token });
      } else {
        setError("Invalid credentials.");
      }
    }
  };

  return (
    <StyledContainer>
      <StyledForm
        onSubmit={(event) => handleSubmitLogin(event, username, password)}
      >
        <Input
          autoFocus
          required
          defaultValue="Username"
          disabled={state.isLoading}
          type={"text"}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          required
          defaultValue="Password"
          disabled={state.isLoading}
          type={"password"}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button disabled={state.isLoading}>Login</button>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;
