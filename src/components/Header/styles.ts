import styled from "styled-components";

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme["bg-primary"]};
  gap: 1rem;

  img{
    width: 150px;
    border-radius: 50px;
  }

  form{
    width: 100%;
    display: flex;
    
    input{
      flex: 1;
      padding: 0 1rem;
      border: none;
      border-radius: 6px 0 0 6px;
    }

    button{
      width: 100px;
      height: 40px;
      border: 1px solid ${({ theme }) => theme["green-500"]};
      border-radius: 0 6px 6px 0;
      color: ${({ theme }) => theme.white};
      background-color: ${({ theme }) => theme["green-500"]};
      cursor: pointer;

      &:hover{
        transition: background-color 0.2s;
        background-color: ${({ theme }) => theme["green-700"]};
      }    
    }
  }
`;

export const ButtonLogin = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.white};
  border-radius: 6px;
  color: ${({ theme }) => theme.white};
  background-color: transparent;
  cursor: pointer;

  &:hover{
    color: ${({ theme }) => theme["bg-primary"]};
    background-color: ${({ theme }) => theme.white};
    transition: background-color 0.3s;
  }

`;