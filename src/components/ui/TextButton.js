import React from "react";
import styled from "styled-components";

const TextButton = ({ handleClick, label }) => {
  const StyledButton = styled.button`
    background: ${({ theme }) => theme.buttonBackgroundColour};
    color: ${({ theme }) => theme.buttonTextColour};
    padding: ${({ theme }) => theme.buttonPadding};
  `;

  return <StyledButton onClick={handleClick}>{label}</StyledButton>;
};

export default TextButton;
