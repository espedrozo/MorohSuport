import styled from "styled-components";

export const InputSearchResults = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0 5px 0;
  font-size: 14px;
  outline: 0;
      
  &:focus{
      border: 1px solid ${({ theme }) => theme["color-secondary"]};
      box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["color-secondary"]};
  }
`;

export const AreaLinsRealations = styled.div`
  padding: 5px;
  width: 100%;
  height: 200px;
  overflow: auto;
  white-space:nowrap;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["bg-primary"]};
  box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["bg-primary"]};
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
      background-color: ${({ theme }) => theme["color-secondary"]};
    }

  svg{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;