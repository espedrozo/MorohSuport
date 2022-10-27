import styled from "styled-components";
import { tablet } from "../../styles/responsive";

export const Container = styled.div`
  .lista{
    display: flex;
    font-size: 16px;
    padding: 5px 1px;
    list-style: none;
    text-align: center;
    border-radius: 4px;     
    text-decoration: none;
    flex-direction: column;
    color: ${({ theme }) => theme["blue-200"]};
    border: 1px solid ${({ theme }) => theme["gray-100"]} !important;

    ${tablet({ fontSize: '14px' })};

    &:hover{
      cursor: pointer;
      color: ${({ theme }) => theme.white};
      background-color: ${({ theme }) => theme["blue-200"]};
    }
  }
`;