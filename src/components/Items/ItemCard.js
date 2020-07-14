import React from "react";
import styled from "styled-components";

const StyledItemCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.palette.boxBorder};
  background-color: ${({ theme }) => theme.palette.boxBackground};
  color: ${({ theme }) => theme.palette.text};

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
