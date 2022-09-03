import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100vw; 
  height: calc(100vh - 7rem);

  .main{
    display: flex;

    .esquerda{
      margin: 5px;
      padding: 5px;
      width: 260px;
      display: flex;
      border-radius: 3px;
      flex-direction: column;
      height: calc(100vh - 7.6rem);
      color: ${({ theme }) => theme["gray-900"]};
      border: 1px solid ${({ theme }) => theme["bg-primary"]};

      h4{
        margin: 6.5px 0;
        text-align: center;
        color: ${({ theme }) => theme["bg-primary"]};
      }
    }

    .categoria {
      padding: 5px;
      height: 290px;
      overflow: auto;
      white-space:nowrap;
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme["bg-primary"]};
      box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["bg-primary"]};
    }

    .recentes{
      height: 200px;
      overflow: auto;
      margin-bottom: 5px;
      border-radius: 5px;
      padding: 5px 5px 10px 5px;
      border: 1px solid ${({ theme }) => theme["bg-primary"]};
      box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["bg-primary"]};
    }
  }
`;  