import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CategoriesList } from "../../components/CategoriesList";
import { LastPostsVisited } from "../../components/LastPostsVisited";


export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <div className="main">
        <div className="esquerda">
          <h4>CATEGORIAS</h4>
          <div className='categoria'>
            <CategoriesList />
          </div>

          <h4>ÚLTIMOS ACESSOS</h4>
          <div className='recentes'>
            <LastPostsVisited />
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </LayoutContainer>
  )
}