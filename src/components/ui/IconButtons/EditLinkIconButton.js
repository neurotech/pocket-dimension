import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ChainIcon from "heroicons/solid/link.svg";
import { SET_ITEM_DIALOG_OPEN } from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";

const LinkIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.linkIconButtonBorder};
  background-color: ${({ theme }) => theme.linkIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.linkIconButtonBackgroundHover};
    color: ${({ theme }) => theme.linkIconButtonBorder};
  }
`;

const LinkIconButton = ({ item, children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
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
