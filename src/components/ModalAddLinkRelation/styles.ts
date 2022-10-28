import styled from "styled-components";
import { tablet } from "../../styles/responsive";

export const InputSearchResults = styled.input`
  outline: 0;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  margin: 5px 0 5px 0;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
      
  &:focus{
    border: 1px solid ${({ theme }) => theme["blue-200"]};
    box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["blue-200"]};
  }

  ${tablet({ padding: '8px 5px' })};
`;

export const AreaLinsRealations = styled.div`
  padding: 5px;
  width: 100%;
  height: 200px;
  overflow: auto;
  white-space:nowrap;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["blue-900"]};
  box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["blue-900"]};

  span{
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }

    ${tablet({ fontSize: '13px' })};
  }
`;

export const UlLink = styled.ul`
  list-style: none;
`;

export const LiAddLink = styled.li`
  margin: 5px 0;
  display: flex;
  cursor: pointer;
  align-items: center;

  &:hover {
    border-radius: 2px;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme["blue-200"]};
  }
`;

export const ButtonAddLink = styled.button`
  border: none;
  height: 40px;
  width: 100px;
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  justify-content: center; 
  background-color: transparent;
  color: ${({ theme }) => theme["blue-900"]};

  ${tablet({ width: '80px', height: '30px', fontSize: '12px' })};
`;