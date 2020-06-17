import React from "react";
import styled from "styled-components";

const StyledItemCard = styled.div`
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  border: 2px solid ${({ theme }) => theme.cardBorder};
  background-color: ${({ theme }) => theme.cardBackgroundColour};
  padding: ${({ theme }) => theme.cardPadding};
  margin: 0 ${({ theme }) => theme.cardPadding};
  filter: grayscale(${(props) => (props.isStale ? 1 : 0)});
  opacity: ${(props) => (props.isStale ? 0.5 : 1)};
  cursor: ${(props) => (props.isStale ? "not-allowed" : "auto")};
`;

const ItemCard = ({ isStale = false, children }) => {
  return <StyledItemCard isStale={isStale}>{children}</StyledItemCard>;
};

export default ItemCard;
