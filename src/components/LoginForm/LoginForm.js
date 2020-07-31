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
import StarField from "./StarField.js";

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.commonPalette.trueblack};
`;

const BlueBox = styled.div`
  filter: grayscale(${(props) => (props.isLoading ? 1 : 0)});
  padding: ${({ theme }) => theme.loginFormPadding};
  background-color: ${({ theme }) => theme.commonPalette.darkblue};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.commonPalette.lightblue};

  @media only screen and (max-width: 849px) {
    flex-grow: 0;
    flex-shrink: 1;
    margin: 1rem;
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  @media only screen and (max-width: 849px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StyledInput = styled(Input)`
  padding: ${({ theme }) => theme.loginFormInputPadding};
  font-size: ${({ theme }) => theme.fontSize * 1.75}px;
  font-weight: 600;
  border-color: ${({ theme }) => theme.commonPalette.heavyblue};
  background-color: ${({ theme }) => theme.commonPalette.paleblue};
  color: ${({ theme }) => theme.commonPalette.heavyblue};

  & ::placeholder {
    color: ${({ theme }) => theme.commonPalette.dimblue};
  }

  & :focus {
    border-color: ${({ theme }) => theme.commonPalette.yellow};
  }

  & :disabled {
    cursor: not-allowed;
  }
`;

const StyledTextButton = styled(TextButton)`
  width: 100%;
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
        <StarField />
        <BlueBox isLoading={state.isLoading}>
          <Stack space="small">
            <StyledInput
              required
              autocomplete={"username"}
              disabled={state.isLoading}
              onChange={(event) => setUsername(event.target.value)}
              placeholder={"Username"}
              type={"text"}
            />
            <StyledInput
              required
              autocomplete={"current-password"}
              disabled={state.isLoading}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={"Password"}
              type={"password"}
            />
            <StyledTextButton
              size={"xlarge"}
              disabled={state.isLoading}
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
