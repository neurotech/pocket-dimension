import React from "react";
import styled, { keyframes, css } from "styled-components";

const StyledButton = styled.button`
  background: none;
  font-family: "Segoe UI";
  outline: none;
  cursor: pointer;
`;

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const Icon = styled.div`
  line-height: 0;
  padding: ${({ theme }) => theme.iconButtonPadding};
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.iconButtonBorder};
  background-color: ${({ theme }) => theme.iconButtonBackground};
  color: ${({ theme }) => theme.iconButtonText};
  transition: border-color 0.15s, background-color 0.15s, color 0.15s;
  &:hover {
    background-color: ${({ theme }) => theme.iconButtonBackgroundHover};
  }
`;

const NoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.noteIconButtonBorder};
  background-color: ${({ theme }) => theme.noteIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.noteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.noteIconButtonBorder};
  }
`;

const LinkIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.linkIconButtonBorder};
  background-color: ${({ theme }) => theme.linkIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.linkIconButtonBackgroundHover};
    color: ${({ theme }) => theme.linkIconButtonBorder};
  }
`;

const DiaryIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.diaryIconButtonBorder};
  background-color: ${({ theme }) => theme.diaryIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.diaryIconButtonBackgroundHover};
    color: ${({ theme }) => theme.diaryIconButtonBorder};
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

const rotationMixin = css`
  animation: ${rotate} 2s linear infinite;
`;

const RefreshIcon = styled(Icon)`
  background-color: ${({ theme }) => theme.refreshIconButtonBackground};
  border-color: ${({ theme }) => theme.refreshIconButtonBorder};
  color: ${({ theme }) => theme.refreshIconButtonText};
  &:hover {
    border-color: ${({ theme }) => theme.refreshIconButtonBorderHover};
    background-color: ${({ theme }) => theme.refreshIconButtonBackgroundHover};
    color: ${({ theme }) => theme.refreshIconButtonTextHover};
  }
  & svg {
    ${(props) => (props.isLoading ? rotationMixin : "animation: none")};
  }
`;

const AllIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.allIconButtonBorder};
  background-color: ${({ theme }) => theme.allIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.allIconButtonBackgroundHover};
    color: ${({ theme }) => theme.allIconButtonBorder};
  }
`;

const CreateIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.createIconButtonBorder};
  background-color: ${({ theme }) => theme.createIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.createIconButtonBackgroundHover};
    color: ${({ theme }) => theme.createIconButtonBorder};
  }
`;

const LogoutIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.logoutIconButtonBorder};
  background-color: ${({ theme }) => theme.logoutIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.logoutIconButtonBackgroundHover};
    color: ${({ theme }) => theme.logoutIconButtonBorder};
  }
  & svg {
    transform: scaleX(-1);
  }
`;

const renderIconButton = (handleClick, variant, isLoading, children) => {
  let iconToRender = <Icon>{children}</Icon>;

  switch (variant) {
    case "all":
      iconToRender = <AllIcon>{children}</AllIcon>;
      break;

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

    case "refresh":
      iconToRender = (
        <RefreshIcon isLoading={isLoading}>{children}</RefreshIcon>
      );
      break;

    case "create":
      iconToRender = <CreateIcon>{children}</CreateIcon>;
      break;

    case "logout":
      iconToRender = <LogoutIcon>{children}</LogoutIcon>;
      break;

    default:
      break;
  }

  return <StyledButton onClick={handleClick}>{iconToRender}</StyledButton>;
};

const IconButton = ({
  handleClick,
  variant = "default",
  isLoading = false,
  children,
}) => {
  return renderIconButton(handleClick, variant, isLoading, children);
};

export default IconButton;
