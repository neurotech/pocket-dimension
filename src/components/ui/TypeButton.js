import React from "react";
import styled from "styled-components";
import itemTypes from "../../util/itemTypes";

const StyledTypeButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  user-select: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize + 1}px;
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;

  border-color: ${({ theme }) => theme.palette.typeButtonBorder};
  background: ${({ theme }) => theme.palette.typeButtonBackground};
  color: ${({ theme }) => theme.palette.typeButtonText};

  padding-top: ${({ theme }) => theme.buttonPadding}rem;
  padding-right: 0;
  padding-bottom: ${({ theme }) => theme.buttonPadding}rem;
  padding-left: 0;
`;

const NoteTypeButton = styled(StyledTypeButton)`
  border-color: ${({ theme }) => theme.commonPalette.darkblue};
  background: ${({ theme }) => theme.commonPalette.blue};
  color: ${({ theme }) => theme.commonPalette.white};
`;

const LinkTypeButton = styled(StyledTypeButton)`
  border-color: ${({ theme }) => theme.commonPalette.darkgreen};
  background: ${({ theme }) => theme.commonPalette.green};
  color: ${({ theme }) => theme.commonPalette.white};
`;

const DiaryTypeButton = styled(StyledTypeButton)`
  border-color: ${({ theme }) => theme.commonPalette.darkyellow};
  background: ${({ theme }) => theme.commonPalette.yellow};
  color: ${({ theme }) => theme.commonPalette.white};
`;

const resolveVariantToTypeButton = (variant, onClick, active) => {
  switch (variant) {
    case itemTypes.note:
      if (active) {
        return <NoteTypeButton onClick={onClick}>Note</NoteTypeButton>;
      } else {
        return <StyledTypeButton onClick={onClick}>Note</StyledTypeButton>;
      }

    case itemTypes.link:
      if (active) {
        return <LinkTypeButton onClick={onClick}>Link</LinkTypeButton>;
      } else {
        return <StyledTypeButton onClick={onClick}>Link</StyledTypeButton>;
      }

    case itemTypes.diary:
      if (active) {
        return <DiaryTypeButton onClick={onClick}>Diary</DiaryTypeButton>;
      } else {
        return <StyledTypeButton onClick={onClick}>Diary</StyledTypeButton>;
      }

    default:
      return <StyledTypeButton onClick={onClick}>???</StyledTypeButton>;
  }
};

const TypeButton = ({ active = false, onClick, variant }) => {
  return resolveVariantToTypeButton(variant, onClick, active);
};

export default TypeButton;
