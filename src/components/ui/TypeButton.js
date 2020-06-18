import React from "react";
import styled from "styled-components";
import itemTypes from "../../util/itemTypes";

const StyledTypeButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  user-select: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize}px;
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;

  border-color: ${({ theme }) => theme.typeButtonBorder};
  background: ${({ theme }) => theme.typeButtonBackground};
  color: ${({ theme }) => theme.typeButtonText};

  padding-top: ${({ theme }) => theme.buttonPadding}rem;
  padding-right: 0;
  padding-bottom: ${({ theme }) => theme.buttonPadding}rem;
  padding-left: 0;
`;

const NoteTypeButton = styled(StyledTypeButton)`
  border-color: ${({ theme }) => theme.noteTypeButtonBorder};
  background: ${({ theme }) => theme.noteTypeButtonBackground};
  color: ${({ theme }) => theme.noteTypeButtonText};
`;

const LinkTypeButton = styled(StyledTypeButton)`
  border-color: ${({ theme }) => theme.linkTypeButtonBorder};
  background: ${({ theme }) => theme.linkTypeButtonBackground};
  color: ${({ theme }) => theme.linkTypeButtonText};
`;

const DiaryTypeButton = styled(StyledTypeButton)`
  border-color: ${({ theme }) => theme.diaryTypeButtonBorder};
  background: ${({ theme }) => theme.diaryTypeButtonBackground};
  color: ${({ theme }) => theme.diaryTypeButtonText};
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
