import styled from "styled-components";


export const AreaAddNewCategories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content:flex-start;

  :first-child {
    margin-right: 15px;
  }
  .select-category{
    width: 100%;
    border: 1px solid ${({ theme }) => theme["gray-200"]};
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0 5px 0;
    font-size: 14px;
    outline: 0;
    
    &:focus{
        border: 0.5px solid ${({ theme }) => theme["blue-200"]};
        box-shadow: 0px 0px 1px 0.3px ${({ theme }) => theme["blue-200"]};
    }
  }
`;

export const InputSearchResults = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0 5px 0;
  font-size: 14px;
  outline: 0;
      
  &:focus{
      border: 0.5px solid ${({ theme }) => theme["blue-200"]};
      box-shadow: 0px 0px 1px 0.3px ${({ theme }) => theme["blue-200"]};
  }
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
`;

export const AreaButtonsAddNewCategories = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BaseButton = styled.button`
  width: 80px;
  height: 30px;
  padding: 2px;
  border: none;
  padding: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
`;

export const ManegerButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["green-500"]};
  
  &:hover{
    transition: 0.3s;
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["gray-400"]};

  &:hover{
    transition: 0.3s;
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
    background: ${({ theme }) => theme["blue-200"]};
    transition: background-color 0.2s;
  }
`;

/* export const TableBody = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: auto; 

  ::-webkit-scrollbar {
    display: none;
  }

` */

export const TableOfCategories = styled.table`
  width: 100%;

  thead, tbody{
    display: block;  
  }

  thead{
    border-radius: 4px;
    color: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme["blue-900"]};
    border: 0.1px solid ${({ theme }) => theme["blue-900"]};
  }
  
  tbody{
    height: 300px;
    overflow-y: auto;
  }

  th{
    padding: 5px;
    width: 300px;
    text-align: center;
  }
`;


export const BaseTabela = styled.td`
  padding: 5px;
  width: 300px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
`;

export const LinhaTR = styled.tr``;

export const LinhaTB = styled(BaseTabela)`
  .select-category, input{
    outline: 0;
    width: 100%;
    padding: 3px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme["gray-200"]};
    
    &:focus{
        border: 0.5px solid ${({ theme }) => theme["blue-200"]};
        box-shadow: 0px 0px 1px 0.3px ${({ theme }) => theme["blue-200"]};
    }
  }
`;

export const LinhaTableButton = styled(BaseTabela)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  button{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;   
    font-size: 1rem;

    svg{
      width: 26px;
      height: 26px;
    }

    .update-category{
      cursor:pointer;
      border-radius: 2px;
      border: 1px solid transparent;
      color: ${({ theme }) => theme["blue-900"]};
    
      &:hover{
        transition: 0.3s;
        color: ${({ theme }) => theme["blue-200"]};
        border: 1px solid ${({ theme }) => theme["blue-200"]};
      }
    }
    .save-category{
      cursor:pointer;
      border-radius: 2px;
      border: 1px solid transparent;
      color: ${({ theme }) => theme['green-500']};


      &:hover{
        transition: 0.3s;
        color: ${({ theme }) => theme["green-300"]};
        border: 1px solid ${({ theme }) => theme["green-300"]};
      }
    }

    .trash-category{
      cursor:pointer;
      border-radius: 2px;
      border: 1px solid transparent;
      color: ${({ theme }) => theme['red-500']};

      &:hover{
        transition: 0.3s;
        color: ${({ theme }) => theme["red-300"]};
        border: 1px solid ${({ theme }) => theme["red-300"]};
      }
    }
    
  }
`;

