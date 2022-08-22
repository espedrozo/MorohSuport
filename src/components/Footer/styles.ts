import styled from "styled-components";

export const ContainerFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  bottom:0;
  height: 5vh;
  width: 100vw;
  background-color: #005693;
  color: #fff;
  margin: 0;
`;

export const TextFooter = styled.p`
    margin: 0;
    @media only screen and (max-width: 600px) {    
        font-size: 12px
    }
`;