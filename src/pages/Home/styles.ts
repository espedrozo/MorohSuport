import styled from "styled-components";
import { tablet } from "../../styles/responsive";

export const SectionRight = styled.div`
  flex: 1;
  margin: 5px;
  padding: 5px;
  display: flex;
  border-radius: 3px;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme["blue-900"]};
`;

export const TitlteSection = styled.h3`
  margin: 5px 0;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme["blue-900"]};
`;

export const SectionScroll = styled.div`
  width: 100%;
  height: 98%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin: 0 auto 5px auto;
  scrollbar-color: rebeccapurple green;
  border: 1px solid ${({ theme }) => theme["blue-900"]};
  box-shadow: 0 0 2px ${({ theme }) => theme['blue-900']};
`;
