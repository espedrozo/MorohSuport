import styled from "styled-components";

export const Container = styled.div`
  .lista{
    display: flex;
    font-size: 14px;
    padding: 5px 1px;
    list-style: none;
    text-align: center;
    border-radius: 4px;     
    text-decoration: none;
    flex-direction: column;
    color: ${({ theme }) => theme["color-secondary"]};
    border: 1px solid ${({ theme }) => theme["gray-100"]} !important;

    &:hover{
      cursor: pointer;
      color: ${({ theme }) => theme.white};
      background-color: ${({ theme }) => theme["color-secondary"]};
    }
  }
`;