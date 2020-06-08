import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "Segoe UI";
  outline: none;
  cursor: pointer;
`;

const Icon = styled.div`
  line-height: 0;
  padding: ${({ theme }) => theme.iconButtonPadding};
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.iconButtonBorder};
  background-color: ${({ theme }) => theme.iconButtonBackground};
  color: ${({ theme }) => theme.iconButtonText};
  &:hover {
    background-color: ${({ theme }) => theme.iconButtonBackgroundHover};
  }
`;

const NoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.noteIconButtonBorder};
  background-color: ${({ theme }) => theme.noteIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.noteIconButtonBackgroundHover};
  }
`;

const LinkIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.linkIconButtonBorder};
  background-color: ${({ theme }) => theme.linkIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.linkIconButtonBackgroundHover};
  }
`;

const DiaryIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.diaryIconButtonBorder};
  background-color: ${({ theme }) => theme.diaryIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.diaryIconButtonBackgroundHover};
  }
`;

const FocusIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.focusIconButtonBorderHover};
    background-color: ${({ theme }) => theme.focusIconButtonBackgroundHover};
    color: ${({ theme }) => theme.focusIconButtonTextHover};
  }
`;

const ArchiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.archiveIconButtonBorderHover};
    background-color: ${({ theme }) => theme.archiveIconButtonBackgroundHover};
    color: ${({ theme }) => theme.archiveIconButtonTextHover};
  }
`;

const DeleteIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.deleteIconButtonBorderHover};
    background-color: ${({ theme }) => theme.deleteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.deleteIconButtonTextHover};
  }
`;

const renderIconButton = (handleClick, variant, children) => {
  let iconToRender = <Icon>{children}</Icon>;

  switch (variant) {
    case "note":
      iconToRender = <NoteIcon>{children}</NoteIcon>;
      break;

    case "link":
      iconToRender = <LinkIcon>{children}</LinkIcon>;
      break;

    case "diary":
      iconToRender = <DiaryIcon>{children}</DiaryIcon>;
      break;

    case "focus":
      iconToRender = <FocusIcon>{children}</FocusIcon>;
      break;

    case "archive":
      iconToRender = <ArchiveIcon>{children}</ArchiveIcon>;
      break;

    case "delete":
      iconToRender = <DeleteIcon>{children}</DeleteIcon>;
      break;

    default:
      break;
  }

  return <StyledButton onClick={handleClick}>{iconToRender}</StyledButton>;
};

const IconButton = ({ handleClick, variant = "default", children }) => {
  return renderIconButton(handleClick, variant, children);
};

export default IconButton;
