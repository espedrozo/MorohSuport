import styled from "styled-components";
import { tablet } from "../../styles/responsive";

export const AreaAddNewCategories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content:flex-start;

  :first-child {
    margin-right: 15px;
  }
  .select-category{
    outline: 0;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    margin: 5px 0 5px 0;
    border: 1px solid ${({ theme }) => theme["gray-200"]};

    ${tablet({ padding: '5px', fontSize: '12px' })};
  
    &:focus{
      border: 0.5px solid ${({ theme }) => theme["blue-200"]};
      box-shadow: 0px 0px 1px 0.3px ${({ theme }) => theme["blue-200"]};
    }
  }

  ${tablet({ fontSize: '12px' })};
`;

export const InputSearchResults = styled.input`
  outline: 0;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  margin: 5px 0 5px 0;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
      
  &:focus{
      border: 0.5px solid ${({ theme }) => theme["blue-200"]};
      box-shadow: 0px 0px 1px 0.3px ${({ theme }) => theme["blue-200"]};
  }
  ${tablet({ fontSize: '12px', padding: '5px' })};
`;

export const AreaLinsRealations = styled.div`
  width: 100%;
  padding: 5px;
  height: 200px;
  overflow: auto;
  white-space:nowrap;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["blue-900"]};
  box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["blue-900"]};

  ${tablet({ fontSize: '12px' })};
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

  svg{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  ${tablet({ fontSize: '12px' })};
`;

export const AreaButtonsAddNewCategories = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${tablet({ fontSize: '12px' })};
`;

export const BaseButton = styled.button`
  width: 80px;
  height: 30px;
  padding: 2px;
  border: none;
  padding: 6px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.white};

  ${tablet({ width: '70px', height: '25px', fontSize: '12px', marginRight: '5px' })};
`;

export const ManegerButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["green-500"]};
  
  &:hover{
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["gray-400"]};

  &:hover{
    background-color:  ${({ theme }) => theme["gray-500"]};
  }
`;

export const ConfirmationButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["blue-900"]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    transition: background-color 0.2s;
    background: ${({ theme }) => theme["blue-200"]};
  }
`;
