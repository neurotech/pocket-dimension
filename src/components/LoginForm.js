import React, { useState } from "react";
import { useStore } from "../util/Store.js";
import { login } from "../util/asyncActions.js";
import {
  LOGIN,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
} from "../util/actionTypes";

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
    <form onSubmit={(event) => handleSubmitLogin(event, username, password)}>
      <input
        autoFocus
        required
        placeholder="Username"
        disabled={state.isLoading}
        type={"text"}
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <input
        required
        placeholder="Password"
        disabled={state.isLoading}
        type={"password"}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button disabled={state.isLoading}>Login</button>
    </form>
  );
};

export default LoginForm;
