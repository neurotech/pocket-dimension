import styled from "styled-components";

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

export default Icon;
