import { Link } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../../../contexts/PostsContext';
import {
  CardBoder,
  CardHeader,
  CardTitle,
  CardBody,
  ButtonDetalhe,
  CardText,
  CardFooter,
  CardSmall,
} from './styles';

export function Posts() {

  const {
    paginacaoDePosts,
    paginacaoDePostsComBusca
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  return (
    <>
      {paginacaoDePostsComBusca !== undefined ?
        paginacaoDePostsComBusca?.map((item, index) => (
          <CardBoder key={index}>
            <CardHeader>
              <CardTitle>
                {
                  item.titulo.length > 80 ?
                    item.titulo.substring(0, 80).toLocaleUpperCase() + "..."
                    : item.titulo.toUpperCase()
                }
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{item.resumo.substring(0, 120) + "..."}</CardText>
              <Link to={`/postdetails/${item.id_post}`}>
                <ButtonDetalhe>
                  Ver mais...
                </ButtonDetalhe>
              </Link>
            </CardBody>
            <CardFooter>
              <CardSmall>
                Atualizado em: {item.data_publicacao?.substring(8, 2)}-{item.data_publicacao?.substring(5, 2)}-{item.data_publicacao?.substring(0, 4)}
              </CardSmall>
            </CardFooter>
          </CardBoder>
        ))
        :
        paginacaoDePosts?.map((item, index) => (
          <CardBoder key={index}>
            <CardHeader>
              <CardTitle>
                {
                  item.titulo.length > 80 ?
                    item.titulo.substring(0, 80).toLocaleUpperCase() + "..."
                    : item.titulo.toUpperCase()
                }
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{item.resumo.substring(0, 120) + "..."}</CardText>
              <Link to={`/postdetails/${item.id_post}`}>
                <ButtonDetalhe>
                  Ver mais...
                </ButtonDetalhe>
              </Link>
            </CardBody>
            <CardFooter>
              <CardSmall>
                Atualizado em: {item.data_publicacao.substring(8, 2)}-{item.data_publicacao.substring(5, 2)}-{item.data_publicacao.substring(0, 4)}
              </CardSmall>
            </CardFooter>
          </CardBoder>
        ))
      }
    </>
  );
}