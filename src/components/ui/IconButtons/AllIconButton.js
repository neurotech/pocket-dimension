import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import HomeIcon from "heroicons/solid/home.svg";
import { useStore } from "../../../util/Store.js";
import { FILTER_TYPE_CHANGED } from "../../../util/actionTypes.js";
import itemTypes from "../../../util/itemTypes.js";

const AllIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkorange};
  background-color: ${({ theme }) => theme.commonPalette.orange};
  color: ${({ theme }) => theme.commonPalette.white};

  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightorange};
    color: ${({ theme }) => theme.commonPalette.darkorange};
  }
`;

const AllIconButton = ({ children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: FILTER_TYPE_CHANGED, payload: itemTypes.all });
        }}
      >
        <AllIcon>
          <HomeIcon width={20} height={20} />
          {children}
        </AllIcon>
      </Button>
    </div>
  );
};

export default AllIconButton;
