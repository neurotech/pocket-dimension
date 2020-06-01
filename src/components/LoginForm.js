import React, { useState } from "react";
import { login } from "../util/asyncActions.js";

const Items = ({ setToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmitLogin = async (event, username, password) => {
    event.preventDefault();
    if (!sessionStorage.getItem("token")) {
      setError(null);
      setIsLoading(true);

      let response = await login(username, password);

      setIsLoading(false);

      if (response.token) {
        sessionStorage.setItem("token", response.token);
        setToken(response.token);
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
