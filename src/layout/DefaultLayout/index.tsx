import { Outlet } from "react-router-dom";
import { CategoriesList } from "../../components/CategoriesList";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LastPostsVisited } from "../../components/LastPostsVisited";
import { LayoutContainer } from "./styles";


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