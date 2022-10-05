import styled from "styled-components";

export const ContainerPagination = styled.div`

  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  
  a{
    width: 7vh;
    height: 7vh;
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
    background-color: ${({ theme }) => theme["color-secondary"]};
    border: 1px solid ${({ theme }) => theme["color-secondary"]};
  }

 a.active {
   border: 1px solid #7cbddb;
   color: ${({ theme }) => theme.white};
   background-color: ${({ theme }) => theme["bg-primary"]};
  }
   a.disabled { 
    opacity: 0.2;
  }
   a:hover:not(.active) {
    background-color: ${({ theme }) => theme["color-secondary"]}; 
    box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["bg-primary"]};
  }

`;