import { ButtonLogin, ContainerHeader } from "./styles";
import LogoSuport from '../../assets/logo.svg';

export function Header() {
  return (
    <ContainerHeader>
      <img src={LogoSuport} alt="" />
      <form>
        <input type="text" placeholder="Digite sua pesquisa" />
        <button>Pesquisar</button>
      </form>
      <ButtonLogin>Login</ButtonLogin>
    </ContainerHeader>
  )
}