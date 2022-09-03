import styled from "styled-components";

export const ContainerPagination = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  
  a{
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    padding: 8px 14px;
    margin-right: 5px;
    height: 7vh;
    width: 7vh;
    border-radius: 50%;
    text-decoration: none;
    background-color: #00aabb;
    transition: background-color .2s;
    border: 1px solid #00aabb;
    cursor: pointer;
  }

 a.active {
    background-color: #005693 ;
    color: white;
    border: 1px solid #7cbddb;
  }
   a.disabled { 
    opacity: 0.2;
  }
   a:hover:not(.active) {background-color: #00aabb; box-shadow: 0px 0px 5px 0.5px #005693;
  }

`;