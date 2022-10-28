import styled from "styled-components";
import { tablet } from "../../../../styles/responsive";

export const Container = styled.div`

  .video{
    width: 100%;
    padding: 5px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme["blue-900"]};
    box-shadow: 0px 0px 1px 0.2px ${({ theme }) => theme["blue-900"]};

    iframe{
      width: 100%;
      height: 300px;

      ${tablet({ width: '100%' })};
    }
  }

  h2{
      text-align: center;

      ${tablet({ fontSize: '20px' })};
    }
    
  h4{
    margin: 10px 0;

    ${tablet({ fontSize: '15px' })};
  }

  p{
    margin: 10px 0;
    text-align: justify;

    ${tablet({ fontSize: '14px' })};
  }

  a{
    text-decoration: none;
    color: ${({ theme }) => theme["gray-700"]};

    ${tablet({ fontSize: '12px' })};
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

  ${tablet({ fontSize: '14px' })};
`;

export const FormPost = styled.form`
  outline:0;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["gray-100"]};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  a{
    display: flex;
    margin: 5px 0;
    align-items: center;

    &:hover{
      cursor: pointer;
      color: ${({ theme }) => theme["blue-200"]};
    }

    svg{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
`;

export const ImageDetails = styled.img`
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme["blue-900"]};
  box-shadow: 0px 0px 1px 0.2px ${({ theme }) => theme["blue-900"]};
`;

export const TextPostItem = styled.p`
  text-align: justify;

  ${tablet({ fontSize: '14px' })};
`;

export const ObservationArea = styled.div`
  width: 100%;
  padding: 5px;
  line-height: 1.5;
  font-style: italic;
  border-radius: 5px;
  white-space: pre-wrap;
  background-color: ${({ theme }) => theme["yellow-300"]};

  ${tablet({ fontSize: '14px' })};
`;

export const AreaButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;  
`;

export const BaseButton = styled.button`
  border: none;
  padding: 5px;
  height: 40px;
  width: 100px;
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  justify-content: center;  
  color: ${({ theme }) => theme.white};

  ${tablet({ width: '80px', height: '30px', fontSize: '12px' })};
`;

export const BackButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["blue-200"]};
  
  &:hover{
    background-color: ${({ theme }) => theme["blue-100"]};
  }
`;

export const EditeButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["blue-900"]};

  &:hover{
    background-color: ${({ theme }) => theme["blue-300"]};
  }
`;

export const DeleteButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme["red-400"]};
  
  &:hover{
    background-color: ${({ theme }) => theme["red-600"]};
  }
`;