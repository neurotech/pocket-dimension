import React from "react";
import styled, { css } from "styled-components";

const resolveTypeToAccentColour = (theme, itemType) => {
  switch (itemType) {
    case "note":
      return theme.commonPalette.blue;

    case "link":
      return theme.commonPalette.green;

    case "diary":
      return theme.commonPalette.yellow;
  }
};

const generateGradientMixinForType = (itemType) => {
  let mixin = css`
    background: linear-gradient(
      90deg,
      ${({ theme }) => resolveTypeToAccentColour(theme, itemType)} 0%,
      ${({ theme }) => resolveTypeToAccentColour(theme, itemType)} 4px,
      ${({ theme }) => theme.palette.boxBackground} 4px,
      ${({ theme }) => theme.palette.boxBackground} 100%
    );
  `;

  return mixin;
};

const StyledItemCard = styled.div`
  background: ${({ theme }) => theme.palette.boxBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.palette.boxBorder};
  color: ${({ theme }) => theme.palette.text};

  padding: ${({ theme }) => theme.cardPadding};
  margin: 0 ${({ theme }) => theme.cardPadding};
  filter: grayscale(${(props) => (props.isStale ? 1 : 0)});
  opacity: ${(props) => (props.isStale ? 0.5 : 1)};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};

  & :hover {
    ${(props) => generateGradientMixinForType(props.itemType)};
  }
`;

const ItemCard = ({
  isStale = false,
  title,
  itemType = "note",
  onClick,
  children,
}) => {
  return (
    <StyledItemCard
      title={title}
      itemType={itemType}
      onClick={onClick}
      isStale={isStale}
    >
      {children}
    </StyledItemCard>
  );
};

export default ItemCard;
