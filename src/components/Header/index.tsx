import { MenuBurger } from '../MenuBurger';
import { UserCircle } from 'phosphor-react';
import LogoSuport from '../../assets/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../contexts/PostsContext';
import { fazerLogout, isLogged } from "../../lib/authHandler";
import {
  AreaUser,
  AvatarUser,
  AreaLogo,
  ButtonCreatePost,
  ButtonLogin,
  ButtonLogout,
  ContainerHeader,
  ContainerHeaderBurguer
} from "./styles";

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
                  <UserCircle weight="fill" />
                  <span>
                    Bem vindo!
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