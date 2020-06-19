import React from "react";
import styled, { css, keyframes } from "styled-components";
import ArrowIcon from "heroicons/solid/chevron-up.svg";

const fadeInKeyframes = keyframes`
  from {
    transform: translateY(4px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInMixin = css`
  animation: ${fadeInKeyframes} 0.2s ease-out;
`;

const ArrowContainer = styled.div`
  display: inline;
  position: relative;
  min-width: 1rem;
  min-height: 1rem;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  ${fadeInMixin};
  position: absolute;
  right: 0;
  bottom: -1.5rem;
  color: ${({ theme }) => theme.palette.indicator};
`;

const ArrowIndicator = () => {
  return (
    <ArrowContainer>
      <StyledArrowIcon width={20} height={20} />
    </ArrowContainer>
  );
};

export default ArrowIndicator;
