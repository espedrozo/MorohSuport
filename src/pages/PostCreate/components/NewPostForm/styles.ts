import styled from "styled-components";
import { darken, lighten } from "polished";
import { desktopLarge, tablet } from "../../../../styles/responsive";

export const Container = styled.div`

  .video{
    width: 100%;
    padding: 5px;
    margin: 5px 0;
   
          ${desktopLarge({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})};
        
    iframe{
      width: 100%;
      height: 300px;
      max-width: 800px;
      border-radius: 5px;
    border: 1px solid ${({ theme }) => theme["blue-900"]};
    box-shadow: 0px 0px 1px 0.2px ${({ theme }) => theme["blue-900"]};

    }
  }

  svg{
    ${tablet({ width: '25px' })};
  }

  form{ 
    gap: 0.5rem;
    display: flex;
    flex-direction: column;

    input, textarea {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme["gray-100"]};
      
      &:focus {
        box-shadow: 0 0 2px ${({ theme }) => theme['blue-200']};
      }

      ${tablet({ fontSize: '14px' })};
    }

    textarea{
      height: 80px;
    }

    label{
      margin-top: 10px;
      font-weight: bold;
      color: ${({ theme }) => theme["blue-900"]};

      ${tablet({ fontSize: '13px' })};
    }
  }
`;

export const BaseAreaContainer = styled.div`
  display: flex;
  border-radius: 5px;
  font-size: 0.875rem;
  padding: 0px 5px 10px;  
  box-shadow: 0 0 2px  ${({ theme }) => theme["blue-900"]};
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
    color: ${({ theme }) => theme["blue-900"]};

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
  color: ${({ theme }) => theme["blue-900"]};

  span{
    display: flex;
    cursor: pointer;
    align-items: center;

    ${tablet({ fontSize: '12px' })};

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
  box-shadow: 0 0 2px  ${({ theme }) => theme["blue-900"]};

  ul {
    list-style: none;
    padding-top: 5px;

    li{ 
      padding: 2px;
      display: flex;
      margin-bottom: 5px;
      align-items: center;
      justify-content: space-between;
      border: 1px solid transparent;

      ${tablet({ fontSize: '12px' })};

      &:hover {
        border-radius: 2px;
        border: 1px solid ${({ theme }) => theme["blue-200"]};
      }

      div{
        display: flex;
        align-items: center;
        justify-content: center;
      }

      svg{
        color: ${({ theme }) => theme["blue-200"]};
      }

      span{
        flex: 1;
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
    color: ${({ theme }) => theme["blue-900"]};

    ${tablet({ fontSize: '12px' })};

    .add_passos{
      color: ${({ theme }) => theme["green-700"]};

      ${tablet({ fontSize: '12px' })};

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

  ${tablet({ width: '60px', height: '30px', fontSize: '12px' })};
`;

export const ButtonCancel = styled(ButtonBase)`
  background-color: ${({ theme }) => theme["blue-200"]};

  &:hover{
    transition: background-color 0.2s;
    background-color: ${({ theme }) => darken(0.05, theme["blue-200"])};
  }

  a{
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
`;

export const ButtonSave = styled(ButtonBase)`
  background-color: ${({ theme }) => theme["blue-900"]};  

  &:hover{
    transition: background-color 0.2s;
    background-color: ${({ theme }) => darken(0.05, theme["blue-900"])};
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
    box-shadow: 0 0 2px ${({ theme }) => theme['blue-200']};
  }

  &:hover{
    cursor: pointer;
    box-shadow: 0 0 2px ${({ theme }) => theme['blue-200']};
    background-color: ${({ theme }) => lighten(0.2, theme["gray-300"])};
  }  
`;

export const AreaImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageDetails = styled.img`
  width: 100%;
  padding: 2px;
  max-width: 800px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["blue-900"]};
  box-shadow: 0px 0px 1px 0.2px ${({ theme }) => theme["blue-900"]};
`;

export const LinkImagemInput = styled.input`
  outline: 0;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
      
  &:focus{
    border: 1px solid ${({ theme }) => theme['blue-200']};
    box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme['blue-200']};
  }
`;

export const LinkVideoInput = styled.input`
  outline: 0;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["gray-200"]};
      
  &:focus{
    border: 1px solid ${({ theme }) => theme['blue-200']};
    box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme['blue-200']};
  }
`;