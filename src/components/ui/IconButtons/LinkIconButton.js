import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ChainIcon from "heroicons/solid/link.svg";
import { FILTER_TYPE_CHANGED } from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";
import itemTypes from "../../../util/itemTypes.js";

const LinkIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.linkIconButtonBorder};
  background-color: ${({ theme }) => theme.linkIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.linkIconButtonBackgroundHover};
    color: ${({ theme }) => theme.linkIconButtonBorder};
  }
`;

const LinkIconButton = ({ children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: FILTER_TYPE_CHANGED, payload: itemTypes.link });
        }}
      >
        <LinkIcon>
          <ChainIcon width={20} height={20} />
          {children}
        </LinkIcon>
      </Button>
    </div>
  );
};

export default LinkIconButton;