import { PlusCircle } from "phosphor-react";
import { Container } from "./styles";

export function NewPostForm() {
  return (
    <Container>
      <form action="">
        <div className="new_category">
          <div>
            <label> Escolha uma Categoria:</label>
            <select>
              <option>NENHUMA</option>
              <option>BOLETOS</option>
              <option>VENDAS</option>
              <option>PDFs</option>
            </select>
          </div>
          <PlusCircle size={30} />
        </div>
        <div className="new_post">
          <label id="title">Titulo:</label>
          <input
            type="text"
            name="titulo"
            id="title"
            placeholder="Digite um título"
          />
          <label id="resumo">Resumo:</label>
          <textarea
            name="resumo"
            id="resumo">
          </textarea>

          <label id="conteudo">Observações:</label>
          <textarea
            name="obs"
            id="conteudo">
          </textarea>
        </div>

      </form>
    </Container>
  )
}