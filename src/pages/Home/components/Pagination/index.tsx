import { useState, useEffect } from 'react';
import { ContainerPagination } from './styles';
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../../../contexts/PostsContext';

export function Pagination() {

  const {
    totalPaginas,
    setPaginaAtual,
    paginaAtualDaPaginacao,
    setPaginaAtualDaPaginacao
  } = useContextSelector(PostesContext, (context) => {
    return context
  })

  const numeroDePaginas: Number[] = []
  const [botaoAtual, setBotaoAtual] = useState(1)
  const [setaDoBotaoAtual, setSetaDoBotaoAtual] = useState<any[]>([])


  for (let i = 1; i <= totalPaginas; i++) {
    numeroDePaginas.push(i)
  }

  useEffect(() => {
    let numeroTemporarioDePaginas = [...setaDoBotaoAtual]

    let pontoInicial = '...'
    let pontoEsquerdo = '... '
    let pontoDireito = ' ...'

    if (numeroDePaginas.length < 6) {
      numeroTemporarioDePaginas = numeroDePaginas
    }

    else if (botaoAtual >= 1 && botaoAtual <= 3) {
      numeroTemporarioDePaginas = [1, 2, 3, 4, pontoInicial, numeroDePaginas.length]
    }

    else if (botaoAtual === 4) {
      const intervaloDePaginas = numeroDePaginas.slice(0, 5)
      numeroTemporarioDePaginas = [...intervaloDePaginas, pontoInicial, numeroDePaginas.length]
    }

    else if (botaoAtual > 4 && botaoAtual < (numeroDePaginas.length - 2)) {
      const intervaloDePaginas1 = numeroDePaginas.slice(botaoAtual - 2, botaoAtual)
      const intervaloDePaginas2 = numeroDePaginas.slice(botaoAtual, botaoAtual + 1)
      numeroTemporarioDePaginas = (
        [1, pontoEsquerdo,
          ...intervaloDePaginas1,
          ...intervaloDePaginas2,
          pontoDireito,
          numeroDePaginas.length]
      )
    }

    else if (botaoAtual > numeroDePaginas.length - 3) {                 // > 7
      const intervaloDePaginas = numeroDePaginas.slice(numeroDePaginas.length - 4)
      numeroTemporarioDePaginas = ([1, pontoEsquerdo, ...intervaloDePaginas])
    }
    else if (String(botaoAtual) == pontoInicial) {
      setBotaoAtual(setaDoBotaoAtual[setaDoBotaoAtual.length - 3] + 1)
    }
    else if (String(botaoAtual) == pontoDireito) {
      setBotaoAtual(setaDoBotaoAtual[3] + 2)
    }

    else if (String(botaoAtual) == pontoEsquerdo) {
      setBotaoAtual(setaDoBotaoAtual[3] - 2)
    }

    setSetaDoBotaoAtual(numeroTemporarioDePaginas)

    setPaginaAtual(botaoAtual);

    if (botaoAtual === totalPaginas) {
      setPaginaAtualDaPaginacao(paginaAtualDaPaginacao + 1);
    }

  }, [botaoAtual, totalPaginas]);

  return (
    <ContainerPagination>
      <a
        href="#"
        aria-label="Anterior"
        className={`${botaoAtual === 1 ? 'disabled' : ''}`}
        onClick={() => setBotaoAtual(prev => prev <= 1 ? prev : prev - 1)}
      >
        <span aria-hidden="true">&laquo;</span>
      </a>

      {setaDoBotaoAtual.map(((item, index) => {
        return <a
          href="#"
          key={index}
          className={`${botaoAtual === item ? 'active' : ''}`}
          onClick={() => setBotaoAtual(item)}
        >
          {item}
        </a>
      }))}
      <a
        href="#"
        aria-label="Próximo"
        className={`${botaoAtual === numeroDePaginas.length ? "disabled" : ''}`}
        onClick={() => setBotaoAtual(prev => prev >= numeroDePaginas.length ? prev : prev + 1)}
      >
        <span aria-hidden="true">&raquo;</span>
      </a>

    </ContainerPagination>
  );
};
