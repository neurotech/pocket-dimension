import React, { createContext, useReducer, useContext } from "react";
import initialState from "./initialState.js";
import reducer from "./reducer.js";

const StoreContext = createContext(initialState);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};
