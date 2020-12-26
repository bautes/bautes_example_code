import styled from "styled-components";

export const Wrapper = styled.span`
  & input,
  & select {
    display: inline-block;
    width: calc(100% / 4);
    font-size: inherit;
  }
`;
