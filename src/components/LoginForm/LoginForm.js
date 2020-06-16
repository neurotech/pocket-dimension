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
import Stack from "../ui/layout/Stack.js";
import TextButton from "../ui/TextButton.js";

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

const BlueBox = styled.div`
  filter: ${(props) => (props.isLoading ? "grayscale(1)" : "grayscale(0)")};
  width: 20%;
  padding: ${({ theme }) => theme.loginFormPadding};
  background-color: ${({ theme }) => theme.loginFormBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.loginFormBorder};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const StyledInput = styled(Input)`
  padding: ${({ theme }) => theme.loginFormInputPadding};
  font-size: ${({ theme }) => theme.fontSize * 1.75}px;
  font-weight: 600;
  border-color: ${({ theme }) => theme.loginFormInputBorder};
  background-color: ${({ theme }) => theme.loginFormInputBackground};

  & ::placeholder {
    color: ${({ theme }) => theme.loginFormInputPlaceholderText};
  }
`;

const StyledTextButton = styled(TextButton)`
  background: red;
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
        <BlueBox isLoading={state.isLoading}>
          <Stack space="small">
            <StyledInput
              autoFocus
              required
              placeholder="Username"
              disabled={state.isLoading}
              type={"text"}
              onChange={(event) => setUsername(event.target.value)}
            />
            <StyledInput
              required
              placeholder="Password"
              disabled={state.isLoading}
              type={"password"}
              onChange={(event) => setPassword(event.target.value)}
            />
            <StyledTextButton
              handleClick={(event) =>
                handleSubmitLogin(event, username, password)
              }
              label={"Login"}
            />
          </Stack>
        </BlueBox>
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;
