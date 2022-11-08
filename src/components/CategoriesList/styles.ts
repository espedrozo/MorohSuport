import styled from "styled-components";

export const Container = styled.div`
  padding: 5px;

  ul {
    list-style: none;
  } 
`;

export const Li = styled.li`

  padding-bottom: 2px;

  a{
    border-radius: 2px;
    text-decoration: none;
    color: ${({ theme }) => theme["blue-200"]};
   
    &:hover {
      color: ${({ theme }) => theme.white};
      background-color: ${({ theme }) => theme["blue-200"]};
    }
  }

  a.open {
    font-weight: normal;
  }

  a:not(.open){
    font-weight: normal;
  }

  &.has-children {
    cursor: pointer;
    position: relative;  
  }
  
  &.has-children.open {
    font-weight: bold;
    color: ${({ theme }) => theme["blue-900"]};
  }

  &.has-children:not(.open) {
    font-weight: normal;
    color: ${({ theme }) => theme["blue-900"]};
  }

  &.has-children::before {
    content: "+";
    font-size: 20px;
    margin-right: 5px;
    font-family: Arial, Helvetica, sans-serif;
    color: ${({ theme }) => theme["blue-900"]};
  }

  &.has-children.open::before {
    content: "-";
    font-size: 20px;
    margin-right: 10px;
    font-family: Arial, Helvetica, sans-serif;
    color: ${({ theme }) => theme["blue-900"]};
  }

  & > ul {
    display: none;
    margin: 5px 0;
  }
  
  &.open > ul {
    display: block;
    margin-left: 20px;
  }
`;