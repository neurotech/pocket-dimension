import React from "react";
import styled from "styled-components";
import TextButton from "../TextButton.js";

const StyledTextButton = styled(TextButton)`
  border-color: ${({ theme }) => theme.commonPalette.darkred};
  background: ${({ theme }) => theme.commonPalette.red};
  color: ${({ theme }) => theme.commonPalette.white};

  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightred};
    color: ${({ theme }) => theme.commonPalette.darkred};
  }
`;

const LogoutIcon = ({ onClick }) => {
  return <StyledTextButton label={"Logout"} onClick={onClick} size="large" />;
};

export default LogoutIcon;
