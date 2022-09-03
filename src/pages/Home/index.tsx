import { Container, SectionRight, SectionScroll } from "./styles";
import { Posts } from "./components/Posts";
import { Pagination } from "./components/Pagination";
import { useState } from "react";
import { Paginacao } from "../../components/Paginacao";

export function Home() {

  const [page, setPage] = useState(1);

  return (
    <Container>
      <SectionRight>
        <h3>RESULTADOS DA PESQUISA</h3>
        <SectionScroll>
          <Posts />
        </SectionScroll>
        <Paginacao />
        {/*  <Pagination
          totalCountOfRegisters={30}
          currentPage={1}
          onPageChange={setPage}
        /> */}
      </SectionRight>
    </Container>
  )
}