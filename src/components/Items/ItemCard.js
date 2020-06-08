import React from "react";
import styled from "styled-components";

const StyledItemCard = styled.div`
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  border: 2px solid ${({ theme }) => theme.cardBorder};
  background-color: ${({ theme }) => theme.cardBackgroundColour};
  padding: ${({ theme }) => theme.cardPadding};
  margin: 0 ${({ theme }) => theme.cardPadding};
`;

const ItemCard = ({ children }) => {
  return <StyledItemCard>{children}</StyledItemCard>;
};

export default ItemCard;
