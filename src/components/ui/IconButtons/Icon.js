import styled from "styled-components";

const Icon = styled.div`
  line-height: 0;
  padding: ${({ theme }) => theme.iconButtonPadding};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;

  border-color: ${({ theme }) => theme.palette.iconBorder};
  background-color: ${({ theme }) => theme.palette.iconBackground};
  color: ${({ theme }) => theme.palette.iconText};

  transition: border-color 0.15s, background-color 0.15s, color 0.15s;
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.palegray};
  }
`;

export default Icon;
