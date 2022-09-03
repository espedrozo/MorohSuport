import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AreaButton,
  BackButton,
  Container,
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

var idRecentes = JSON.parse(localStorage.getItem('idRecentes')) || [];
var postRecentes = JSON.parse(localStorage.getItem('postRecentes')) || [];

interface PostItemProps {
  id_post_item: string;
  titulo_passo: string;
  conteudo: string;
  imagem: string;
  video: string;
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

  let logado = isLogged();
  const { id_post } = useParams();
  const history = useNavigate();

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
          idRecentes = JSON.parse(localStorage.getItem('idRecentes'));

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
          idRecentes = JSON.parse(localStorage.getItem('idRecentes'));

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
    }
    getOnePostForIdInfo(id_post);
  }, [id_post]);

  // Função que exclui um post pelo ID
  const handleDetele = () => {
    /*    const deletePosts = async (id) => {
           let json = await api.deletePosts(id);
       }
       deletePosts(id);
 
       var index = idRecentes.indexOf(id);
 
       if (index > -1) {
           idRecentes.splice(index, 1);
       }
 
       // Salvando a Lista de IDs no localStorage
       localStorage.setItem('idRecentes', JSON.stringify(idRecentes));
       idRecentes = JSON.parse(localStorage.getItem('idRecentes'));
 
       // Localizando objeto dentro do Array de PostsRecentes
       const postRecentEncontrado = postRecentes.find(element => element.id_post == id);
 
       if (postRecentEncontrado) {
           var indexPostRecente = postRecentes.indexOf(postRecentEncontrado);
           if (indexPostRecente > -1) {
               postRecentes.splice(indexPostRecente, 1);
           }
           localStorage.setItem('postRecentes', JSON.stringify(postRecentes.slice(-5)));
       }
       sessionStorage.removeItem('categorias');
       sessionStorage.removeItem('idCategorias')
       window.location.href = "/"; */
  }



  return (
    <Container>

      {logado ?

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
                    <div className="d-flex justify-content-center">
                      <ImageDetails src={postItem.imagem} />
                    </div>
                  }
                  {postItem.video &&
                    <div className="d-flex justify-content-center">
                      <Player
                        playsInline
                        src={postItem.video}
                        fluid={false}
                        width={300}
                        height={300}
                      />
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

          {postInfo.relacao &&
            <>
              <h4>Tópicos Relacionados: </h4>
              {postInfo.relacao.map((item, index) =>
                <FormGroup key={index}>
                  <ul>
                    <a href={`/detalhe/${item.id_relacao}`}>
                      <li className="link-relacao" >
                        {item.titulo}
                      </li>
                    </a>
                  </ul>
                </FormGroup>
              )}
            </>
          }

          <Spacer />

          <div className="row">
            <div className="col justify-content-center text-center">
              <BackButton className='btn btn-voltar' onClick={() => history('/')}>Voltar</BackButton>
            </div>
            <div className="col justify-content-center text-center">
              <Link to={`/atualizar/${id_post}`} className="btn btn-editar">Editar Post</Link>
            </div>
            <div className="col justify-content-center text-center">
              <button type="button" className="btn btn-excluir" data-toggle="modal" data-target="#ModalCentralizado">Excluir Post</button>
              <div className="modal fade bd-modal-sm" id="ModalCentralizado" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                  <div className="modal-content">
                    <div className="modal-header bg-danger">
                      <h5 className="modal-title text-white pl-3 ml-5" id="TituloModalCentralizado">EXCLUIR POST</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                        <span className="text-white" aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">Deseja realmente excluir este Post?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary mx-auto" data-dismiss="modal">Cancelar</button>
                      <button onClick={() => handleDetele()} className="btn btn-primary mx-auto" data-dismiss="modal">Confirmar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormPost>

        :

        <FormPost onSubmit={handleDetele}>
          <h2>{postInfo.titulo}</h2>
          <Resume>
            <strong>Resumo: </strong>{postInfo.resumo}
          </Resume>
          {postInfo.obs &&
            <ObservationArea>
              <strong>OBS: </strong>{postInfo.obs}
            </ObservationArea>
          }

          {postInfo.postitem &&
            <>
              {postInfo.postitem.map((postItem) =>
                <Fragment key={postItem.id_post_item}>
                  <TextPostItem>
                    <strong>Passo: &nbsp;{postItem.titulo_passo} - &nbsp; </strong> {postItem.conteudo}
                  </TextPostItem>
                  {postItem.imagem &&
                    <div>
                      <ImageDetails src={postItem.imagem} />
                    </div>
                  }
                  {postItem.video &&
                    <div>
                      <Player
                        playsInline
                        src={postItem.video}
                        fluid={false}
                        width={300}
                        height={300}
                      />
                    </div>
                  }
                  {postItem.observacao &&
                    <ObservationArea>
                      <p>
                        <strong>OBS: </strong> {postItem.observacao}
                      </p>
                    </ObservationArea>
                  }
                </Fragment>
              )}
            </>
          }

          {postInfo.relacao &&
            <Fragment>
              <h4>Tópicos Relacionados: </h4>
              {postInfo.relacao.map((item, index) =>
                <FormGroup key={index}>
                  <ul>
                    <a href={`/postdetails/${item.id_relacao}`}>
                      <li className="post_rela">
                        {item.titulo}
                      </li>
                    </a>
                  </ul>
                </FormGroup>
              )}
            </Fragment>
          }

          <Spacer />

          <AreaButton>
            <BackButton onClick={() => history('/home')}>Voltar</BackButton>
          </AreaButton>
        </FormPost>
      }
    </Container>
  );
}