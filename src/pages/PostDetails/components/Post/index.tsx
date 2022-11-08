import { api } from "../../../../lib/Api";
import { LinkSimple } from "phosphor-react";
import { useState, useEffect } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { isLogged } from "../../../../lib/authHandler";
import { useContextSelector } from "use-context-selector";
import { ModalDelete } from "../../../../components/ModalDelete";
import { PostesContext } from "../../../../contexts/PostsContext";
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

import {
  AreaButton,
  AreaImage,
  BackButton,
  Container,
  EditeButton,
  FormGroup,
  FormPost,
  ImageDetails,
  ObservationArea,
  Resume,
  Spacer,
  TextPostItem
} from './styles';

var idRecentesLocal = localStorage.getItem('@moroh-suport-v1.0.1:idRecentes');
var idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

var postRecentesLocal = localStorage.getItem('@moroh-suport-v1.0.1:postRecentes');
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
  const navigate = useNavigate();
  const { id_post } = useParams();

  const [postInfo, setPostInfo] = useState({} as PostDetailsProps);

  useEffect(() => {

    const getOnePostForIdInfo = async (id_post: string | undefined) => {

      const response = await api.getOnePostForId(id_post);

      setPostInfo(response);

      if (typeof (id_post) === 'string') {

        const idRecentEncontrado = idRecentes.find((element: string) => element === id_post);

        if (!idRecentEncontrado && id_post !== '0') {

          idRecentes.push(id_post)

          localStorage.setItem('@moroh-suport-v1.0.1:idRecentes', JSON.stringify(idRecentes));

          const idRecentesLocal = localStorage.getItem('@moroh-suport-v1.0.1:idRecentes');
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
            localStorage.setItem('@moroh-suport-v1.0.1:postRecentes', JSON.stringify(postRecentes.slice(-5)));
          }
        } else {
          var index = idRecentes.indexOf(id_post);

          if (index > -1) {
            idRecentes.splice(index, 1);
          }
          idRecentes.push(id_post)

          localStorage.setItem('@moroh-suport-v1.0.1:idRecentes', JSON.stringify(idRecentes));

          const idRecentesLocal = localStorage.getItem('@moroh-suport-v1.0.1:idRecentes');
          idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

          const postRecentEncontrado = postRecentes.find((element: { id_post: string; }) => element.id_post === id_post);

          if (postRecentEncontrado) {
            var indexPostRecente = postRecentes.indexOf(postRecentEncontrado);
            if (indexPostRecente > -1) {
              postRecentes.splice(indexPostRecente, 1);
            }
            postRecentes?.push(response);
            localStorage.setItem('@moroh-suport-v1.0.1:postRecentes', JSON.stringify(postRecentes.slice(-5)));
          } else {
            postRecentes?.push(response);
            localStorage.setItem('@moroh-suport-v1.0.1:postRecentes', JSON.stringify(postRecentes.slice(-5)));
          }
        }
      }
      setReloadContextPostsVisited(!reloadContextPostsVisited);
    }

    getOnePostForIdInfo(id_post);

  }, [id_post]);

  async function handleDetele() {

    if (id_post) {
      const response = await api.deletePosts(id_post);
      console.log("USAR TOST INFORMATIVO PRA EXIBIR NA TELA ", response);
    }

    var index = idRecentes.indexOf(id_post);

    if (index > -1) {
      idRecentes.splice(index, 1);
    }

    localStorage.setItem('@moroh-suport-v1.0.1:idRecentes', JSON.stringify(idRecentes));

    const idRecentesLocal = localStorage.getItem('@moroh-suport-v1.0.1:idRecentes');
    idRecentes = idRecentesLocal !== null ? JSON.parse(idRecentesLocal) : [];

    const postRecentEncontrado = postRecentes.find((element: { id_post: string | undefined; }) => element.id_post == id_post);

    if (postRecentEncontrado) {
      var indexPostRecente = postRecentes.indexOf(postRecentEncontrado);
      if (indexPostRecente > -1) {
        postRecentes.splice(indexPostRecente, 1);
      }
      localStorage.setItem('@moroh-suport-v1.0.1:postRecentes', JSON.stringify(postRecentes.slice(-5)));

      postRecentesLocal = localStorage.getItem('@moroh-suport-v1.0.1:postRecentes');
      postRecentes = postRecentesLocal !== null ? JSON.parse(postRecentesLocal) : [];
    }

    localStorage.removeItem('@moroh-suport-v1.0.1:idRecentes');

    setReloadContext(!reloadContext);
    setReloadContextPostsVisited(!reloadContextPostsVisited);

    navigate("/home");
  }

  return (
    <Container>

      <FormPost>
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
                  <AreaImage>
                    <ImageDetails src={postItem.imagem} alt="" />
                  </AreaImage>
                }
                {postItem.url_imagem &&
                  <AreaImage>
                    <ImageDetails src={postItem.url_imagem} alt="" />
                  </AreaImage>
                }
                {postItem.video &&
                  <div className="video">
                    <iframe
                      id="player"
                      title="video"
                      frameBorder="0"
                      allow="fullscreen"
                      src={postItem.video}
                    >
                    </iframe>
                  </div>

                }
                {postItem.url_video &&
                  <div className="video">
                    <iframe
                      id="player"
                      title="video"
                      frameBorder="0"
                      allow="fullscreen"
                      src={postItem.url_video}
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
                  <div>
                    <LinkSimple />
                  </div>
                  <span>{item.titulo}</span>
                </NavLink>
              )
            }
          </FormGroup>
        }

        <Spacer />

        {logado ?

          <AreaButton>

            <BackButton type="button" onClick={() => navigate(-1)}>Voltar</BackButton>

            <Link to={`/postedit/${id_post}`}>
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
            <BackButton type="button" onClick={() => navigate(-1)}>Voltar</BackButton>
          </AreaButton>
        }
      </FormPost>
    </Container >
  );
}