import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ChainIcon from "heroicons/solid/link.svg";
import BanIcon from "heroicons/solid/ban.svg";
import { SET_ITEM_DIALOG_OPEN } from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";

const EditLinkIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkgreen};
  background-color: ${({ theme }) => theme.commonPalette.green};
  color: ${({ theme }) => theme.commonPalette.white};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightgreen};
    color: ${({ theme }) => theme.commonPalette.darkgreen};
  }
`;

const StaleEditLinkIcon = styled(Icon)`
  cursor: not-allowed;
  border-color: ${({ theme }) => theme.commonPalette.darkgreen};
  background-color: ${({ theme }) => theme.commonPalette.green};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.green};
  }
`;

const getIcon = (isStale, children) => {
  if (isStale) {
    return (
      <StaleEditLinkIcon>
        <BanIcon width={20} height={20} />
        {children}
      </StaleEditLinkIcon>
    );
  }

  return (
    <EditLinkIcon>
      <ChainIcon width={20} height={20} />
      {children}
    </EditLinkIcon>
  );
};

const LinkIconButton = ({ item, isStale, children }) => {
  const { dispatch } = useStore();

  return (
    <Button
      title={"Edit this Link item"}
      onClick={() => {
        dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
      }}
    >
      {getIcon(isStale, children)}
    </Button>
  );
};

export default LinkIconButton;
