import styled from "styled-components";
import { tablet } from "../../../../styles/responsive";

export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${tablet({ margin: '10px 0' })};
  
  a{
    width: 40px;
    height: 40px;
    display: flex;
    cursor: pointer;
    padding: 8px 14px;
    margin-right: 5px;
    border-radius: 50%;
    align-items: center;
    text-decoration: none;
    text-decoration: none;
    justify-content: center;
    transition: background-color .2s;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme["blue-200"]};
    border: 1px solid ${({ theme }) => theme["blue-200"]};

    ${tablet({
  width: '30px ',
  height: '30px',
  fontSize: '12px',
  padding: '4px',
})};
  }

 a.active {
   border: 1px solid #7cbddb;
   color: ${({ theme }) => theme.white};
   background-color: ${({ theme }) => theme["blue-900"]};
  }
   a.disabled { 
    opacity: 0.2;
  }
   a:hover:not(.active) {
    background-color: ${({ theme }) => theme["blue-200"]}; 
    box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["blue-900"]};
  }

`;