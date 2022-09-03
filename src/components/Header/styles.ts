import styled from "styled-components";

export const ContainerHeader = styled.div`
  gap: 1rem;
  height: 4rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme["bg-primary"]};

  form{
    flex: 1;
    display: flex;
    
    input{
      flex: 1;
      border: none;
      padding: 0 1rem;
      border-radius: 6px 0 0 6px;
    }

    button{
      width: 100px;
      height: 40px;
      cursor: pointer;
      border-radius: 0 6px 6px 0;
      color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme["green-500"]};
      background-color: ${({ theme }) => theme["green-500"]};

      &:hover{
        transition: background-color 0.2s;
        background-color: ${({ theme }) => theme["green-700"]};
      }    
    }
  }
`;

export const AreaLogo = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;

  img{
    width: 150px;
    border-radius: 50px;
  }
`;

export const BaseButton = styled.button`
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 6px;
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.white};
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 6px;
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.white};
`;

export const ButtonLogin = styled(BaseButton)`
  &:hover{
    transition: background-color 0.3s;
    color: ${({ theme }) => theme["bg-primary"]};
    background-color: ${({ theme }) => theme.white};
  }
`;

export const ButtonCreatePost = styled(BaseButton)`
  &:hover{
    transition: background-color 0.3s;
    color: ${({ theme }) => theme.white};  
    border: 1px solid ${({ theme }) => theme["red-300"]};
    background-color: ${({ theme }) => theme["red-300"]};
  }
`;

export const ButtonLogout = styled(BaseButton)`
  &:hover{
    transition: background-color 0.3s;
    color: ${({ theme }) => theme["bg-primary"]};
    background-color: ${({ theme }) => theme.white};
  }
`;