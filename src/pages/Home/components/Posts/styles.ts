import styled from "styled-components";
import { tablet } from "../../../../styles/responsive";

export const CardBoder = styled.div`
    width: 20vw;
    height: 60vh;
    margin: auto;
    padding: 0px;
    display: flex;
    text-align: center;
    border-radius: 5px;
    flex-direction: column;
    justify-content: space-between;
    border-color: ${({ theme }) => theme["blue-200"]};
    border: 1px solid ${({ theme }) => theme["blue-200"]};

    ${tablet({ width: "250px", margin: "20px", })};

    &:hover {
        border: 1px solid ${({ theme }) => theme["blue-200"]};
        box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["blue-200"]};
    }
`;

export const CardHeader = styled.div`
    margin: 0px;
    padding: 0px;
    max-height: 15vh;
    min-height: 15vh;
    border-radius: 3px 3px 0 0;
    background-color: ${({ theme }) => theme["blue-200"]};
    display: flex;
    align-items: center;
    justify-content: center;
 `;

export const CardTitle = styled.h5`
    margin: 0px;
    padding: 5px;
    font-size: 18px;
    color: ${({ theme }) => theme.white};

    ${tablet({ fontSize: '14px' })};
`;

export const CardBody = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const CardText = styled.p`
    font-size: 16px;
    text-align:justify;
    
    ${tablet({ fontSize: '14px' })}; 

    max-height: 20vh;
    min-height: 20vh;
`;


export const ButtonDetalhe = styled.button`
    width: 90px;
    padding: 7px;
    border: none;
    font-size: 15px;
    border-radius: 5px;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme["blue-200"]};

    &:focus {
        outline: 0;
    }
    
    &:hover {
    cursor: pointer;    
    border-style: none;
    transition: background-color 0.2s;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme["blue-900"]};
    }    
`;

export const CardFooter = styled.div`
    padding: 5px;
    font-size: 14px;
    text-align: right;
    margin-bottom: 2px;
    background-color: ${({ theme }) => theme["gray-050"]};
    border-radius: 0 0 3px 3px;
    border-top: 1px solid ${({ theme }) => theme["blue-200"]};
    
    ${tablet({ fontSize: '12px' })};
`;

export const CardSmall = styled.small`
    padding: 5px;
    font-size: 12px;
    font-style: italic;
    color: ${({ theme }) => theme["gray-400"]};

    ${tablet({ fontSize: '10px' })};
`;

