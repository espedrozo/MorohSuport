import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
`;

export const SectionRight = styled.div`
  margin: 5px;
  padding: 5px;
  border-radius: 3px;
  height: calc(100vh - 7.6rem);
  color: ${({ theme }) => theme["gray-900"]};
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme["bg-primary"]};
`;

export const SectionScroll = styled.div`
  height: 100%;
  margin: auto;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  border: 1px solid ${({ theme }) => theme["bg-primary"]};
  box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["bg-primary"]};
`;
