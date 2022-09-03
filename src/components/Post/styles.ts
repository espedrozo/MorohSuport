import styled from "styled-components";

export const Container = styled.div`

  .post_rela{
    margin-left: 50px;
    margin-bottom: 5px;
    font-style: italic;
    list-style: circle;
    text-decoration: none;
  }

  .post_rela:hover{
    text-decoration: underline;
  }

  h2{
      text-align: center;
    }
    
  h4{
    margin: 10px 0;
  }

  .btn-editar{
    width: 100px;
    background-color: #005696;
    color: #fff;
  }

  .btn-editar:hover{
    background-color: #005680;
  }

  .btn-excluir{
    width: 100px;
    color: #fff;
    background-color: #dc3545;
  }  

  .btn-excluir:hover{
    background-color: #b21f2d;
    color: #fff;
  }

  p{
    margin: 10px 0;
    text-align: justify;
  }

  a{
    text-decoration: none;
    color: ${({ theme }) => theme["gray-700"]};
  }
`;

export const Spacer = styled.hr`
  margin: 10px 0;
  border-radius: 5px;
  border-top: 1px ${({ theme }) => theme["gray-100"]};
`;

export const Resume = styled.p`
  text-align: justify;
  white-space: pre-wrap;
`;

export const FormPost = styled.form`
  outline:0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["gray-100"]};
`;

export const FormGroup = styled.div`

`;

export const ImageDetails = styled.img`
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #005693;
    box-shadow: 0px 0px 1px 0.2px #005693;
`;

export const TextPostItem = styled.p`
  text-align: justify;
`;

export const ObservationArea = styled.div`
    width: 100%;
    padding: 5px;
    line-height: 1.5;
    font-style: italic;
    border-radius: 5px;
    white-space: pre-wrap;
    background-color: #Fff574;
`;

export const AreaButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.button`
  width: 100px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #00aabb;
  color: #fff;

  &:hover{
    cursor: pointer;
    background-color: #00bbbb;
  }
`;