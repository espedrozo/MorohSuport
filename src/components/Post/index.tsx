import React, { useState, useEffect, Fragment } from "react";
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  AreaButton,
  BackButton,
  Container,
  DeleteButton,
  EditeButton,
  FormGroup,
  FormPost,
  ImageDetails,
  ObservationArea,
  Resume,
  Spacer,
  TextPostItem
} from './styles';

import { api } from '../../lib/Api';
//import { Player } from "video-react";

import { isLogged } from "../../lib/authHandler";

import * as Dialog from '@radix-ui/react-dialog';
import { ModalDelete } from "../ModalDelete";
import { Player } from "video-react";
import { LinkSimple } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../contexts/PostsContext";

var idRecentesLocal = localStorage.getItem('idRecentes');
var idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

var postRecentesLocal = localStorage.getItem('postRecentes');
var postRecentes = postRecentesLocal !== null ? JSON.parse(postRecentesLocal) : [];

interface PostItemProps {
  id_post_item: string;
  titulo_passo: string;
  conteudo: string;
  imagem: string;
  url_imagem: string;
  video: string;
  url_video: string;
  observacao: string;
}

interface RelacaoProps {
  id_relacao: string;
  titulo: string;
}

interface PostDetailsProps {
  titulo: string;
  resumo: string;
  obs: string;
  postitem: PostItemProps[];
  relacao: RelacaoProps[]

}

export function Post() {

  const {
    reloadContext,
    setReloadContext,
    reloadContextPostsVisited,
    setReloadContextPostsVisited,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });


  let logado = isLogged();
  const { id_post } = useParams();
  const navigate = useNavigate();

  // Sessão de States ou estados
  const [postInfo, setPostInfo] = useState({} as PostDetailsProps);

  // Função que exibe um post pelo ID
  useEffect(() => {

    const getOnePostForIdInfo = async (id_post: string | undefined) => {
      const response = await api.getOnePostForId(id_post);
      setPostInfo(response);

      if (typeof (id_post) === 'string') {

        const idRecentEncontrado = idRecentes.find((element: string) => element === id_post);

        if (!idRecentEncontrado && id_post !== '0') {

          idRecentes.push(id_post)

          localStorage.setItem('idRecentes', JSON.stringify(idRecentes));

          const idRecentesLocal = localStorage.getItem('idRecentes');
          idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

          const idPostRecentEncontrado = postRecentes.find((element: { id_post: string; }) => element.id_post === id_post);

          if (idPostRecentEncontrado) {
            var indexPostRecente = postRecentes.indexOf(idPostRecentEncontrado);
            if (indexPostRecente > -1) {
              postRecentes.splice(indexPostRecente, 1);
            }
            postRecentes?.push(response);
          } else {
            postRecentes?.push(response);
            localStorage.setItem('postRecentes', JSON.stringify(postRecentes.slice(-5)));
          }
        } else {
          var index = idRecentes.indexOf(id_post);

          if (index > -1) {
            idRecentes.splice(index, 1);
          }
          idRecentes.push(id_post)

          localStorage.setItem('idRecentes', JSON.stringify(idRecentes));

          const idRecentesLocal = localStorage.getItem('idRecentes');
          idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

          const postRecentEncontrado = postRecentes.find((element: { id_post: string; }) => element.id_post === id_post);

          if (postRecentEncontrado) {
            var indexPostRecente = postRecentes.indexOf(postRecentEncontrado);
            if (indexPostRecente > -1) {
              postRecentes.splice(indexPostRecente, 1);
            }
            postRecentes?.push(response);
            localStorage.setItem('postRecentes', JSON.stringify(postRecentes.slice(-5)));
          } else {
            postRecentes?.push(response);
            localStorage.setItem('postRecentes', JSON.stringify(postRecentes.slice(-5)));
          }
        }
      }
      setReloadContextPostsVisited(!reloadContextPostsVisited);
    }

    getOnePostForIdInfo(id_post);

  }, [id_post]);

  // Função que exclui um post pelo ID
  async function handleDetele() {

    if (id_post) {
      const response = await api.deletePosts(id_post);
      console.log("USAR TOST INFORMATIVO PRA EXIBIR NA TELA ", response);
    }

    var index = idRecentes.indexOf(id_post);

    if (index > -1) {
      idRecentes.splice(index, 1);
    }

    // Salvando a Lista de IDs no localStorage
    localStorage.setItem('idRecentes', JSON.stringify(idRecentes));

    const idRecentesLocal = localStorage.getItem('idRecentes');
    idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

    // Localizando objeto dentro do Array de PostsRecentes
    const postRecentEncontrado = postRecentes.find((element: { id_post: string | undefined; }) => element.id_post == id_post);

    if (postRecentEncontrado) {
      var indexPostRecente = postRecentes.indexOf(postRecentEncontrado);
      if (indexPostRecente > -1) {
        postRecentes.splice(indexPostRecente, 1);
      }
      localStorage.setItem('postRecentes', JSON.stringify(postRecentes.slice(-5)));

      postRecentesLocal = localStorage.getItem('postRecentes');
      postRecentes = postRecentesLocal !== null ? JSON.parse(postRecentesLocal) : [];
    }

    localStorage.removeItem('idRecentes');
    //localStorage.removeItem('postRecentes');

    setReloadContext(!reloadContext);
    setReloadContextPostsVisited(!reloadContextPostsVisited);

    //window.location.href = "/home";

    //window.location.href = '/';
    navigate("/home");
  }

  return (
    <Container>

      <FormPost onSubmit={handleDetele}>
        <h2 className="text-center">{postInfo.titulo}</h2>
        <Resume>
          <strong>Resumo: </strong>{postInfo.resumo}
        </Resume>

        {postInfo.obs &&
          <ObservationArea>
            <strong>OBS: </strong>{postInfo.obs}
          </ObservationArea>
        }

        {postInfo.postitem &&
          <div>
            {postInfo.postitem.map((postItem) =>
              <div key={postItem.id_post_item}>
                <TextPostItem>
                  <strong>Passo: &nbsp; {postItem.titulo_passo} - &nbsp; </strong> {postItem.conteudo}
                </TextPostItem>
                {postItem.imagem &&
                  <div>
                    <ImageDetails src={postItem.imagem} alt="" />
                  </div>
                }
                {postItem.url_imagem &&
                  <div>
                    <img src={postItem.url_imagem} className="img-fluid img-detalhes" alt="" />
                  </div>
                }
                {postItem.video &&
                  <div>
                    <Player
                      playsInline
                      src={postItem.video}
                      fluid={false}
                      width={400}
                      height={300}
                    />

                  </div>

                }
                {postItem.url_video &&
                  <div>
                    <iframe
                      id="player"
                      title="video"
                      width="400"
                      height="300"
                      frameBorder="0"
                      src={postItem.url_video}
                      allow="fullscreen"
                    >
                    </iframe>
                  </div>
                }
                {postItem.observacao &&
                  <ObservationArea>
                    <p><strong>OBS: </strong> {postItem.observacao}</p>
                  </ObservationArea>
                }
              </div>
            )}
          </div>
        }

        {
          postInfo.relacao &&

          <FormGroup>
            <h4>Tópicos Relacionados: </h4>
            {
              postInfo.relacao.map((item) =>
                <NavLink
                  key={item.id_relacao}
                  to={`/postdetails/${item.id_relacao}`}
                >
                  <LinkSimple /><span>{item.titulo}</span>
                </NavLink>
              )
            }
          </FormGroup>
        }

        <Spacer />

        {logado ?

          <AreaButton>

            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
            {/*  <button onClick={() => navigate(-1)}>Go 1 pages back</button> */}

            <Link to={`/atualizar/${id_post}`}>
              <EditeButton>Editar Post</EditeButton>
            </Link>

            {/* BUTTON DE DELETE ONE MODAL */}
            <Dialog.Root>
              <ModalDelete handleDetele={handleDetele} />
            </Dialog.Root>
            {/* FIM OF BUTTON DE DELETE ONE MODAL */}

          </AreaButton>
          :
          <AreaButton>
            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
          </AreaButton>
        }
      </FormPost>
    </Container>
  );
}