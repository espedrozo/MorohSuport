import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const LoginForm = styled.form`
  width: 20rem;
  height: 25rem;
  padding: 10px;
  font-size: 1rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #cecece;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme["bg-primary"]};

  h1{
    padding: 2px;
    font-size: 2rem;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.white};
  }
`;

export const AreaInput = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;

  input{
    height: 40px;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

export const TextRecoverPassword = styled.span`
  display: flex;
  align-items: center;
  justify-content:  center;  

  a{
    font-size: 12px;
    text-align: center;
    font-style: italic;
    text-decoration: none;
    color: ${({ theme }) => theme.white};

    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.span`
  padding: 0 5px;
  margin-top: 5px;
  font-size: 0.75rem;
  font-style: italic;
  border-radius: 2px;
  color: ${({ theme }) => theme["red-500"]};
  background-color: ${({ theme }) => theme["gray-100"]};
`;

export const AreaCheckBox = styled.div` 
  label{
    margin-left: 5px;
    cursor: pointer;
  }
`;

export const AreaButton = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;
  justify-content: center;
`;

export const LoginButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.white};

  &:hover{
    transition: background-color 0.3s;
    color: ${({ theme }) => theme["bg-primary"]};
    background-color: ${({ theme }) => theme.white};
  }
`;