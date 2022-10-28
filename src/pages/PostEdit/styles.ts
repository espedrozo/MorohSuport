import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
`;

export const SectionRight = styled.div`
  margin: 5px;
  padding: 5px;
  border-radius: 3px;
  height: calc(100vh - 6.65rem);
  color: ${({ theme }) => theme["gray-900"]};
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme["blue-900"]};
`;

export const TitlePost = styled.h4`
  text-align: center;
  color: ${({ theme }) => theme["blue-900"]};
`;

export const SectionScroll = styled.div`
  padding: 5px;
  margin: auto;
  height: 96.2%;
  border-radius: 5px;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  border: 1px solid ${({ theme }) => theme["blue-900"]};
  box-shadow: 0 0 2px ${({ theme }) => theme["blue-900"]};
`;
