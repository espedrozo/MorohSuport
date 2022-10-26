import LogoSuport from '../../assets/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../contexts/PostsContext';
import { fazerLogout, isLogged } from "../../lib/authHandler";
import { AreaUser, AvatarUser, AreaLogo, AreaNav, ButtonCreatePost, ButtonLogin, ButtonLogout, ContainerHeader, ContainerHeaderBurguer } from "./styles";
import { List, UserCircle } from 'phosphor-react';
import { MenuBurger } from '../MenuBurger';


export function Header() {

  const {
    palavra,
    handleSubmit,
    handleChangeSearcWord,
    userName,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  let user = isLogged();
  let navigate = useNavigate();

  const handleLogout = () => {
    fazerLogout();

    localStorage.removeItem('@moroh-suport-v1.0.1:idRecentes');
    sessionStorage.removeItem('@moroh-suport-v1.0.1:allCategories');
    sessionStorage.removeItem('@moroh-suport-v1.0.1:listOfIdOfCategories');

    navigate('/home');
  }

  return (
    <>
      {user ?
        <>
          <ContainerHeaderBurguer>
            <AreaLogo>
              <MenuBurger user={user} />
            </AreaLogo>
          </ContainerHeaderBurguer>

          <ContainerHeader>
            <AreaLogo>
              <AreaUser>
                <NavLink to="/home" >
                  <img src={LogoSuport} alt="" />
                </NavLink>
                <AvatarUser>
                  <UserCircle size={32} weight="fill" />
                  <span>
                    Bem vindo:
                    <strong>
                      {userName}
                    </strong>
                  </span>
                </AvatarUser>
              </AreaUser>
            </AreaLogo>
            <NavLink to="/home" >
              <ButtonLogin>Início</ButtonLogin>
            </NavLink>
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                type="text"
                defaultValue={palavra || ""}
                placeholder="Digite sua pesquisa"
                onChange={(e) => handleChangeSearcWord(e.target.value)}
              />
              <button>Pesquisar</button>
            </form>
            <NavLink to="/postcreate" >
              <ButtonCreatePost>Criar post</ButtonCreatePost>
            </NavLink>

            <ButtonLogout onClick={handleLogout}>Sair</ButtonLogout>

          </ContainerHeader>

        </>

        :
        <>
          <ContainerHeaderBurguer>
            <AreaLogo>
              <MenuBurger user={user} />
            </AreaLogo>
          </ContainerHeaderBurguer>

          <ContainerHeader>
            <AreaLogo>
              <NavLink to="/home" >
                <img src={LogoSuport} alt="" />
              </NavLink>
            </AreaLogo>

            <NavLink to="/home" >
              <ButtonLogin>Início</ButtonLogin>
            </NavLink>
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                type="text"
                defaultValue={palavra || ""}
                placeholder="Digite sua pesquisa"
                onChange={(e) => handleChangeSearcWord(e.target.value)}
              />
              <button>Pesquisar</button>
            </form>
            <NavLink to="/login" >
              <ButtonLogin>Login</ButtonLogin>
            </NavLink>
          </ContainerHeader>
        </>
      }
    </>
  )
}