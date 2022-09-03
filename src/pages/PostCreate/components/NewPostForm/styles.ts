import styled from "styled-components";

export const Container = styled.div`

  form{ 
    gap: 0.5rem;
    display: flex;
    flex-direction: column;

    .new_category{
      display: flex;
      padding: 10px 5px;
      border-radius: 5px;
      font-size: 0.875rem;
      align-items: center;
      box-shadow: 0 0 2px ${({ theme }) => theme["bg-primary"]};
      justify-content: space-between;

      > div{
        display: flex;
        flex-direction: column;

        label{
          font-weight: bold;
          color: ${({ theme }) => theme["bg-primary"]};
        }
      }

      svg{
        color: ${({ theme }) => theme["bg-primary"]};
        &:hover{
          cursor: pointer;
        }
      }
    }

    .new_post{
      display: flex;
      padding: 10px 5px;
      border-radius: 5px;
      font-size: 0.875rem;
      flex-direction: column;
      box-shadow: 0 0 2px  ${({ theme }) => theme["bg-primary"]};

      label{
        font-weight: bold;
        color: ${({ theme }) => theme["bg-primary"]};
            
        &:not(:first-child){
          margin-top: 15px;
        }
      }

      input, textarea {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme["gray-100"]};
        
        &:focus {
          box-shadow: 0 0 2px ${({ theme }) => theme['color-secondary']};
        }
      }

      textarea{
        height: 80px;
      }
    }
  }

`;