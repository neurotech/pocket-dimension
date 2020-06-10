import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BookIcon from "heroicons/solid/book-open.svg";

const DiaryIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.diaryIconButtonBorder};
  background-color: ${({ theme }) => theme.diaryIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.diaryIconButtonBackgroundHover};
    color: ${({ theme }) => theme.diaryIconButtonBorder};
  }
`;

const DiaryIconButton = ({ onClick, children }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <DiaryIcon>
          <BookIcon width={20} height={20} />
          {children}
        </DiaryIcon>
      </Button>
    </div>
  );
};

export default DiaryIconButton;
