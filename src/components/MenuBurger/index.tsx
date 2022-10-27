
import React from 'react';
import LogoSuport from '../../assets/logo.svg';
import { fazerLogout } from '../../lib/authHandler';
import { keyframes, styled } from '@stitches/react';
import { List, UserCircle, X } from 'phosphor-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../contexts/PostsContext';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { AreaUser, AvatarUser, ButtonCreatePost, ButtonLogin, ButtonLogout, ContainerHeader } from './styles';

const open = keyframes({
  from: { height: '4rem' },
  to: { height: 'var(--radix-collapsible-content-height)' },
});

const close = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: '4rem' },
});

const StyledCollapsible = styled(CollapsiblePrimitive.Root, {
  width: '100%',
});

const CollapsibleContent = styled(CollapsiblePrimitive.Content, {
  marginTop: '8px',
  overflow: 'hidden',
  '&[data-state="open"]': { animation: `${open} 300ms ease-out` },
  '&[data-state="closed"]': { animation: `${close} 300ms ease-out` },
});

// Exports
export const Collapsible = StyledCollapsible;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

// Your app...
const Flex = styled('div', { display: 'flex' });

interface UserProps {
  user: boolean;
}

export function MenuBurger({ user }: UserProps) {

  let navigate = useNavigate();

  const {
    palavra,
    handleSubmit,
    handleChangeSearcWord,
    userName,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  const handleLogout = () => {
    fazerLogout();

    localStorage.removeItem('@moroh-suport-v1.0.1:idRecentes');
    sessionStorage.removeItem('@moroh-suport-v1.0.1:allCategories');
    sessionStorage.removeItem('@moroh-suport-v1.0.1:listOfIdOfCategories');

    navigate('/home');
  }

  console.log(userName);
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <AreaUser>
          <NavLink to="/home" >
            <img src={LogoSuport} alt="" />
          </NavLink>
          {
            user &&

            <AvatarUser>
              <UserCircle weight="fill" />
              <span>
                Bem vindo:
                <strong>
                  {userName}
                </strong>
              </span>
            </AvatarUser>
          }
        </AreaUser>
        <CollapsibleTrigger asChild>
          {open ? <X weight="fill" /> : <List weight="fill" />}
        </CollapsibleTrigger>
      </Flex>

      <CollapsibleContent>
        <ContainerHeader>
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
          {
            user ?
              <>
                <NavLink to="/postcreate" >
                  <ButtonCreatePost>Criar post</ButtonCreatePost>
                </NavLink>
                <ButtonLogout onClick={() => handleLogout()}>Sair</ButtonLogout>
              </>
              :
              <NavLink to="/login" >
                <ButtonLogin>Login</ButtonLogin>
              </NavLink>
          }
        </ContainerHeader>
      </CollapsibleContent>

    </Collapsible>
  );
};
