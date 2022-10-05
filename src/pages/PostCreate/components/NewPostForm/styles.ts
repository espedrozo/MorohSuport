import styled from "styled-components";
import { darken, lighten } from "polished";

export const Container = styled.div`

  form{ 
    gap: 0.5rem;
    display: flex;
    flex-direction: column;

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

    label{
      margin-top: 10px;
      font-weight: bold;
      color: ${({ theme }) => theme["bg-primary"]};
    }
  }
`;

export const BaseAreaContainer = styled.div`
  display: flex;
  border-radius: 5px;
  font-size: 0.875rem;
  padding: 0px 5px 10px;  
  box-shadow: 0 0 2px  ${({ theme }) => theme["bg-primary"]};
`;

export const AreaCategory = styled(BaseAreaContainer)`
  align-items: center;
  justify-content: space-between;

  .category-pai{
    font-weight: bold;
  }

  .subcategory{
    font-style: italic;
  }

  > div{
    display: flex;
    flex-direction: column;
  }

  svg{
    color: ${({ theme }) => theme["bg-primary"]};
    &:hover{
      cursor: pointer;
    }
  }
`;

export const AreaNewPost = styled(BaseAreaContainer)`
  flex-direction: column;
`;

export const AreaNewPostItem = styled(BaseAreaContainer)`
  flex-direction: column;
`;

export const AreaButtonPassos = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => theme["bg-primary"]};

  span{
    display: flex;
    cursor: pointer;
    align-items: center;

    svg.remover_passo{
      color: ${({ theme }) => theme["red-300"]};
    }
  }
`;

export const AreaPostsRelacionados = styled.div`
  display: flex;
  border-radius: 5px;
  font-size: 0.875rem;
  padding: 0px 5px 10px;
  flex-direction: column;
  box-shadow: 0 0 2px  ${({ theme }) => theme["bg-primary"]};

  ul {
    list-style: none;
    padding-top: 5px;

    li{ 
      display: flex;
      padding-bottom: 5px;
      align-items: center;

      svg{
        color: ${({ theme }) => theme["color-secondary"]};
      }

      span{
        margin: 0 5px;
      }

      .trash-link{
        width: 22px;
        height: 22px;
        cursor:pointer;
        border-radius: 2px;
        border: 1px solid transparent;
        color: ${({ theme }) => theme['red-500']};

        &:hover{
          color: ${({ theme }) => theme["red-300"]};
          border: 1px solid ${({ theme }) => theme["red-300"]};
        }
      }
    }
  }
`;

export const AreaOfPassos = styled(BaseAreaContainer)`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  span{
    display: flex;
    cursor: pointer;
    align-items: center;
    color: ${({ theme }) => theme["bg-primary"]};

    .add_passos{
      color: ${({ theme }) => theme["green-700"]};

      &:hover{
        transition: background-color 0.2s;
        color: ${({ theme }) => darken(0.05, theme["green-700"])};
      }
    }
    .add_links{
      color: ${({ theme }) => theme["yellow-500"]};

      &:hover{
        transition: background-color 0.2s;
        color: ${({ theme }) => darken(0.05, theme["yellow-500"])};
      }
    }
  }
`;

export const ButtonBase = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
`;

export const ButtonCancel = styled(ButtonBase)`
  background-color: ${({ theme }) => theme["color-secondary"]};

  &:hover{
    transition: background-color 0.2s;
    background-color: ${({ theme }) => darken(0.05, theme["color-secondary"])};
  }

  a{
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
`;

export const ButtonSave = styled(ButtonBase)`
  background-color: ${({ theme }) => theme["bg-primary"]};  

  &:hover{
    transition: background-color 0.2s;
    background-color: ${({ theme }) => darken(0.05, theme["bg-primary"])};
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const LabelFile = styled.label`
  width: 100%;
  padding: 5px;
  display: flex;
  margin: 0 0 10px 0;
  border-radius: 5px;
  justify-content: flex-end;
  border: 1px solid ${({ theme }) => theme["gray-100"]};
  
  &:focus {
    box-shadow: 0 0 2px ${({ theme }) => theme['color-secondary']};
  }

  &:hover{
    cursor: pointer;
    box-shadow: 0 0 2px ${({ theme }) => theme['color-secondary']};
    background-color: ${({ theme }) => lighten(0.2, theme["gray-300"])};
  }  
`;

export const ImageDetails = styled.img`
  width: 20rem;
  padding: 2px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["bg-primary"]};
  box-shadow: 0px 0px 1px 0.2px ${({ theme }) => theme["bg-primary"]};
`;


export const LinkImagemInput = styled.input`
    width: 100%;
    border: 1px solid ${({ theme }) => theme["gray-200"]};
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0;
    font-size: 14px;
    outline: 0;
        
    &:focus{
        border: 1px solid ${({ theme }) => theme['color-secondary']};
        box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme['color-secondary']};
    }
`;

export const LinkVideoInput = styled.input`
    width: 100%;
    border: 1px solid ${({ theme }) => theme["gray-200"]};
    border-radius: 5px;
    padding: 10px;
    margin: 5px 0;
    font-size: 14px;
    outline: 0;
        
    &:focus{
        border: 1px solid ${({ theme }) => theme['color-secondary']};
        box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme['color-secondary']};
    }
`;