import { Posts } from "./components/Posts";
import { Pagination } from "./components/Pagination";
import { SectionRight, TitlteSection, SectionScroll } from "./styles";

export function Home() {
  return (
    <SectionRight>
      <TitlteSection>RESULTADOS DA PESQUISA</TitlteSection>
      <SectionScroll>
        <Posts />
      </SectionScroll>
      <Pagination />
    </SectionRight>
  )
}