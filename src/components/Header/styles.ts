import styled from "styled-components";
import { desktopLarge, tablet } from "../../styles/responsive";

export const ContainerHeaderBurguer = styled.div`
  gap: 1rem;
  height: 4rem;
  display: none;
  padding: 0 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme["blue-900"]};
  
  ${tablet({ flexDirection: 'column', height: 'auto', gap: '0.2rem', padding: '0.5rem', display: 'block' })}

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

export const ContainerHeader = styled.div`
  gap: 1rem;
  height: 4rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme["blue-900"]};
  
  ${tablet({ flexDirection: 'column', height: 'auto', gap: '0.2rem', padding: '0.5rem', display: 'none' })};

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
  align-items: center;
  justify-content: center;

  ${tablet({ width: '100%', justifyContent: 'space-between' })};
  
  ${desktopLarge({ width: "28%" })};

  img{
    width: 150px;
    border-radius: 50px;
  }
  
  svg{
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 5px;
    color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme["gray-500"]};

    &:hover{
      transition: background-color 0.3s;
      border: 1px solid ${({ theme }) => theme.white};
    }
  }
`;

export const AreaNav = styled.div`
  width: 100%;
  display: flex;
`;

export const BaseButton = styled.button`
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
    color: ${({ theme }) => theme["blue-900"]};
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
    color: ${({ theme }) => theme["blue-900"]};
    background-color: ${({ theme }) => theme.white};
  }
`;

export const AreaUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarUser = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  
  svg{
    width: 30px;
    height: 30px;
    border: none;
    cursor: unset;
    margin-left: 5px;

    &:hover{
      border: none;
    }
  }

  span{
    display: flex;
    flex-direction: column;
  }
`;