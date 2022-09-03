import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { PostesContext } from '../../../../contexts/PostsContext';
import { api } from '../../../../lib/Api';

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

interface PostsProps {
  titulo: string;
  resumo: string;
  data_publicacao: string;
}

export function Posts() {

  const paginacaoDePosts = useContextSelector(
    PostesContext,
    (context) => {
      return context.paginacaoDePosts
    },
  )

  const paginacaoDePostsComBusca = useContextSelector(
    PostesContext,
    (context) => {
      return context.paginacaoDePostsComBusca
    },
  )


  //console.log(paginacaoDePosts)

  /* 
  
  
  paginacaoDePosts
  */


  /*  const [listAllPosts, setListAllPosts] = useState([] as PostsProps[])
      useEffect(() => {
        async function getAllPosts() {
          const posts = await api.getAllPosts()
          setListAllPosts(posts)
        }
        getAllPosts();
      }, []);  */

  return (
    <>
      {paginacaoDePosts !== undefined &&
        paginacaoDePosts?.map((item, index) => (
          <CardBoder key={index}>
            <CardHeader>
              <CardTitle>{item.titulo}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>
                {item.resumo}
              </CardText>
              <Link to={`/postdetails/${item.id_post}`}>
                <ButtonDetalhe>
                  Ver mais...
                </ButtonDetalhe>
              </Link>
            </CardBody>
            <CardFooter>
              <CardSmall>
                Atualizado em: {item.data_publicacao?.substr(8, 2)}-{item.data_publicacao?.substr(5, 2)}-{item.data_publicacao?.substr(0, 4)}
              </CardSmall>
            </CardFooter>
          </CardBoder>
        ))}
      {/* {paginacaoDePostsComBusca ? <h1>Com busca</h1> : <h2>Sem Busca</h2>} */}

      {/*     {paginacaoDePostsComBusca ?
        paginacaoDePostsComBusca?.map((item, index) => (
          <CardBoder key={index}>
            <CardHeader>
              <CardTitle>{item?.titulo}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{item.resumo?.substr(0, 120) + "..."}</CardText>
              <Link to={`/postdetails/${item.id_post}`}>
                <ButtonDetalhe>
                  Ver mais...
                </ButtonDetalhe>
              </Link>
            </CardBody>
            <CardFooter>
              <CardSmall>
                Atualizado em: {item.data_publicacao?.substr(8, 2)}-{item.data_publicacao?.substr(5, 2)}-{item.data_publicacao?.substr(0, 4)}
              </CardSmall>
            </CardFooter>
          </CardBoder>
        ))
        :
        paginacaoDePosts?.map((item, index) => (
          <CardBoder key={index}>
            <CardHeader>
              <CardTitle>{item?.titulo}</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{item.resumo?.substr(0, 120) + "..."}</CardText>
              <Link to={`/postdetails/${item.id_post}`}>
                <ButtonDetalhe>
                  Ver mais...
                </ButtonDetalhe>
              </Link>
            </CardBody>
            <CardFooter>
              <CardSmall>
                Atualizado em: {item.data_publicacao?.substr(8, 2)}-{item.data_publicacao?.substr(5, 2)}-{item.data_publicacao?.substr(0, 4)}
              </CardSmall>
            </CardFooter>
          </CardBoder>
        ))
      } */}
    </>
  );
}