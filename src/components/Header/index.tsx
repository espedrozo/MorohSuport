import LogoSuport from '../../assets/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { fazerLogout, isLogged } from "../../lib/authHandler";
import { AreaLogo, ButtonCreatePost, ButtonLogin, ButtonLogout, ContainerHeader } from "./styles";

export function Header() {

  let navigate = useNavigate();

  let user = isLogged();

  const handleLogout = () => {
    fazerLogout();
    sessionStorage.removeItem('allCategories');
    sessionStorage.removeItem('listOfIdOfCategories');
    navigate('/home')
  }

  return (
    <>
      {user ?
        <ContainerHeader>
          <AreaLogo>
            <NavLink to="/home" >
              <img src={LogoSuport} alt="" />
            </NavLink>
          </AreaLogo>
          <NavLink to="/home" >
            <ButtonLogin>Início</ButtonLogin>
          </NavLink>
          <NavLink to="/postcreate" >
            <ButtonCreatePost>Criar post</ButtonCreatePost>
          </NavLink>

          <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>

        </ContainerHeader>
        :
        <ContainerHeader>
          <AreaLogo>
            <NavLink to="/home" >
              <img src={LogoSuport} alt="" />
            </NavLink>
          </AreaLogo>
          <form>
            <input type="text" placeholder="Digite sua pesquisa" />
            <button>Pesquisar</button>
          </form>
          <NavLink to="/login" >
            <ButtonLogin>Login</ButtonLogin>
          </NavLink>
        </ContainerHeader>
      }
    </>
  )
}