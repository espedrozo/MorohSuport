import styled from "styled-components";
import { mobile } from "../../styles/responsive";

export const ContainerFooter = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme["blue-900"]}; 
`;

export const TextFooter = styled.p`
  margin: 0;
      
  ${mobile({ fontSize: '12px' })};
`;