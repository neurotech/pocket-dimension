import React, { useState } from "react";
import { login } from "../util/asyncActions.js";
import {
  LOGIN,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
} from "../util/actionTypes";

const Items = ({ dispatch, isLoading }) => {
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
        disabled={isLoading}
        type={"text"}
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <input
        required
        placeholder="Password"
        disabled={isLoading}
        type={"password"}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button disabled={isLoading}>Login</button>
    </form>
  );
};

export default Items;
