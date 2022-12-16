import { Posts } from "./components/Posts";
import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "./components/Pagination";
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";
import { SectionRight, TitlteSection, SectionScroll, TitlteSectionUser } from "./styles";
import { isLogged } from "../../lib/authHandler";

export function Home() {


  let user = isLogged();

  const {
    publicado,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  let publicadoLocalStorage = localStorage.getItem('@moroh-suport-v1.0.2:publicado');
  const [newFilter, setNewFilter] = useState(String(publicadoLocalStorage !== null && publicadoLocalStorage));

  function handlerFiltered(event: ChangeEvent<HTMLSelectElement>) {
    setNewFilter(event.target.value);
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem('@moroh-suport-v1.0.2:publicado', newFilter);
  }, [newFilter]);

  return (
    <SectionRight>
      {user ?
        <div className="filtro">
          <div className="publicado">
            <label>Filtrar por: </label> {" "}
            <select onChange={(event) => handlerFiltered(event)}>
              {publicado === '1' ?
                <>
                  <option value="1">Publicados</option>
                  <option value="0">Não Publicados</option>
                </>
                :
                <>
                  <option value="0">Não Publicados</option>
                  <option value="1">Publicados</option>
                </>
              }
            </select>
          </div>
          <TitlteSectionUser>RESULTADOS DA PESQUISA</TitlteSectionUser>
        </div>
        :
        <TitlteSection>RESULTADOS DA PESQUISA</TitlteSection>
      }

      <SectionScroll>
        <Posts />
      </SectionScroll>
      <Pagination />
    </SectionRight>
  )
}