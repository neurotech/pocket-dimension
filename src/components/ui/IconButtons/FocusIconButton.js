import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import EyeIcon from "heroicons/solid/eye.svg";
import { FILTER_TEXT_CHANGED } from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";

const FocusIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.focusIconButtonBorderHover};
    background-color: ${({ theme }) => theme.focusIconButtonBackgroundHover};
    color: ${({ theme }) => theme.focusIconButtonTextHover};
  }
`;

const FocusIconButton = ({ title }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: FILTER_TEXT_CHANGED, payload: title });
        }}
      >
        <FocusIcon>
          <EyeIcon width={20} height={20} />
        </FocusIcon>
      </Button>
    </div>
  );
};

export default FocusIconButton;
