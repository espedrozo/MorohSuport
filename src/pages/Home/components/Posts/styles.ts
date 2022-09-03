import styled from "styled-components";

export const AreaDoPost = styled.div`

/* 
width: 90%;
max-width: 980px;
margin: auto;

display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
grid-gap: 20px; 
*/


`;

export const CardBoder = styled.div`
    padding: 0px;
    margin: 25px;
    width: 16rem;
    display: flex;
    height: 22rem;
    text-align: center;
    border-radius: 5px;
    flex-direction: column;
    justify-content: space-between;
    border-color: ${({ theme }) => theme["color-secondary"]};
    border: 1px solid ${({ theme }) => theme["color-secondary"]};

    &:hover {
        border: 1px solid ${({ theme }) => theme["color-secondary"]};
        box-shadow: 0px 0px 5px 0.5px ${({ theme }) => theme["color-secondary"]};
    }
`;

export const CardHeader = styled.div`
    margin: 0px;
    padding: 0px;
    max-height: 20vh;
    border-radius: 3px 3px 0 0;
    background-color: ${({ theme }) => theme["color-secondary"]};
 `;

export const CardTitle = styled.h5`
    margin: 0px;
    padding: 5px;
    font-size: 18px;
    color: ${({ theme }) => theme.white};
    
@media only screen and (max-width: 600px){
    margin: 0px;
    padding: 5px;
    font-size: 14px;
    color: ${({ theme }) => theme.white};
}
`;

export const CardBody = styled.div`
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const ButtonDetalhe = styled.button`
    width: 90px;
    padding: 7px;
    border: none;
    font-size: 15px;
    border-radius: 5px;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme["color-secondary"]};

    &:focus {
        outline: 0;
    }
    
    &:hover {
    cursor: pointer;    
    border-style: none;
    transition: background-color 0.2s;
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme["bg-primary"]};;
    }    
`;

export const CardText = styled.p`
    font-size: 16px;
    text-align:justify;
    
    @media only screen and (max-width: 600px){
    font-size: 14px;
    text-align:justify;
}   
`;

export const CardFooter = styled.div`
    padding: 5px;
    font-size: 14px;
    text-align: right;
    margin-bottom: 2px;
    background-color: #f7f7f7;
    border-radius: 0 0 3px 3px;
    border-top: 1px solid ${({ theme }) => theme["color-secondary"]};

@media only screen and (max-width: 600px){
    font-size: 12px;
} 
    
`;

export const CardSmall = styled.small`
    padding: 5px;
    font-size: 12px;
    font-style: italic;
    color: ${({ theme }) => theme["gray-400"]};

@media only screen and (max-width: 600px){
    font-size: 10px;
} 
`;

