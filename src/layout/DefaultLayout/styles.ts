import styled from "styled-components";
import { tablet } from "../../styles/responsive";

export const LayoutContainer = styled.div`
  width: 100%; 
  height: calc(100vh - 6rem);

  .main{
    display: flex;

    ${tablet({ flexDirection: 'column-reverse' })};


    .esquerda{
      width: 260px;
      height: calc(100vh - 6.65rem);
      margin: 5px;
      padding: 5px;
      display: flex;
      border-radius: 3px;
      flex-direction: column;
      justify-content: space-between;
      background-color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme["blue-900"]};

      h4{
        text-align: center;
        color: ${({ theme }) => theme["blue-900"]};
      }

      ${tablet({ width: '98%' })};
      
    }
    .categoria {
      padding: 5px;
      height: 60%;
      overflow: auto;
      white-space:nowrap;
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme["blue-900"]};
      box-shadow: 0 0 2px ${({ theme }) => theme['blue-900']};
    }

    .recentes{
      height: 40%;
      overflow: auto;
      margin-bottom: 5px;
      border-radius: 5px;
      padding: 5px 5px 10px 5px;
      border: 1px solid ${({ theme }) => theme["blue-900"]};
      box-shadow: 0 0 2px ${({ theme }) => theme["blue-900"]};
    }
  }
`;  