import styled from "styled-components";
// import { tabletUp } from "../styled/_responsive";

export const DayWrapper = styled.span`

`;

export const Entries = styled.ul`
  padding: .25rem;
  font-size: small;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  height: inherit;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const Entry = styled.li`
  :last-child {
    margin-top: auto;
    width: 100%;
  }

`;
export const AddButton = styled.button`
  width: 100%;
`;

export const RemoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 5px;
  ::before {
    content: 'x';
  }
`;

export const DayFooter = styled(Entry)`
  list-style: none;
  text-align: right;
  align-self: flex-end;
  position: sticky;
  bottom: 0;
`;