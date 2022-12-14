import { api } from '../../../../lib/Api';
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect, Fragment } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ModalAddNewCategory } from '../../../../components/ModalAddNewCategory';
import { ModalDeletePostItem } from '../../../../components/ModalDeletePostItem';
import { ModalAddLinkRelation } from '../../../../components/ModalAddLinkRelation';
import { ModalDeleteLinkRelation } from '../../../../components/ModalDeleteLinkRelation';
import { ArrowCircleDown, ArrowCircleUp, LinkSimple, PlusCircle, Trash } from 'phosphor-react';

import {
  AreaEditPost,
  Container,
  AreaCategory,
  LinkImagemInput,
  LinkVideoInput,
  AreaNewPostItem,
  AreaButtonPassos,
  AreaOfPassos,
  ButtonCancel,
  ButtonSave,
  AreaPostsRelacionados,
  LabelFile,
  InputFile,
  ImageDetails,
  AreaImage
} from './styles';

/* TIPAGENS */
interface RelacaoProps {
  id: string;
  id_relacao: string;
  lk_post: string;
  titulo: string;
}

interface SubProps {
  id: string;
  id_pai: string;
  descricao: string;
}

interface ListCategoriesProps {
  id: string;
  descricao: string;
  sub?: SubProps[];
}

interface ListaDeCategoriesPaiProps {
  id: string;
  descricao: string;
}

interface RetalationLinksProps {
  id_post: string;
  titulo: string;
}

interface PostItemProps {
  id_post_item: string;
  lk_post: string
  ordem: string;
  titulo_passo: string;
  conteudo: string;
  observacao: string;
  imagem: string;
  url_imagem: string;
  video: string;
  url_video: string;
  data_hora: string;
}

interface ValoresProps {
  id_post: string;
  titulo: string;
  resumo: string;
  obs: string;
  data_publicacao: string;
  publicado: string;
  postitem: PostItemProps[];
  relacao: RelacaoProps[];
  categoria: {
    id: string;
    descricao: string;
  }[]
}

interface IObjectKeys {
  [index: number]: string | number;
}

interface PostagemProps extends IObjectKeys {
  id_post_item: string;
  lk_post: string;
  ordem: string;
  titulo_passo: string;
  conteudo: string;
  observacao: string;
  imagem: string;
  url_imagem: string;
  video: string;
  url_video: string;
  data_hora: string;
}

export function FormEdit() {

  const { id_post } = useParams();
  const navigate = useNavigate();
  const id = id_post !== undefined && parseInt(id_post);

  const [nenhuma] = useState('');
  const [error, setError] = useState('');
  const [idItem, setIdItem] = useState('');
  const [idLink, setIdLink] = useState('');
  const [palavra, setPalavra] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valorInput, setValorInput] = useState('');
  const [idCategoriaPai, setIdCategoriaPai] = useState('');
  const [posicaoPostItem, setPosicaoPostItem] = useState(0);
  const [posicaoLinkRelacao, setPosicaoLinkRelacao] = useState(0);

  const [publicado, setPublicado] = useState("1");


  const [videos, setVideos] = useState([""]);
  const [urlsVideos, setUrlsVideos] = useState([""]);
  const [urlsImagens, setUrlsImagens] = useState([""]);
  const [relacao, setRelacao] = useState<RelacaoProps[]>([]);
  const [postagem, setPostagem] = useState<PostagemProps[]>([]);
  const [imagem2, setImagem2] = useState<any[]>([{ name: "" }]);
  const [atualizarCategoria, setAtualizarCategoria] = useState([]);
  const [urlsVideosFormated, setUrlsVideosFormated] = useState([""]);
  const [novarelacao, setNovaRelacao] = useState<RelacaoProps[]>([]);
  const [valores, setValores] = useState<ValoresProps>({} as ValoresProps);
  const [idCategoria, setIdCategoria] = useState(valores.categoria?.[0]?.id);
  const [listOfLinksWithRelations, setListOfLinksWithRelations] = useState([]);
  const [listaDeCategorias, setListaDeCategorias] = useState<ListCategoriesProps[]>([]);
  const [novaCategoria, setNovaCategoria] = useState([{ id_cat: '', descricao: '', id_pai: null }])
  const [listaDeCategoriasPai, setListaDeCategoriasPai] = useState<ListaDeCategoriesPaiProps[]>([]);

  useEffect(() => {
    const getAllPostsForLinksRelations = async () => {
      if (palavra) {
        const response = await api.getAllPosts({ palavra });
        if (response) {
          setListOfLinksWithRelations(response);
        }
      }
    }
    getAllPostsForLinksRelations();
  }, [palavra]);

  const handleChangeInputOfLinksWithRelations = (palavraPesquisada: string) => {
    if (palavraPesquisada !== '') {
      setValorInput(palavraPesquisada);
    } else {
      setPalavra('');
    }
  };

  const handleSearchOfLinksWithRelations = async (palavraPesquisada: string) => {
    if (palavraPesquisada !== '') {
      setPalavra(valorInput);
    } else {
      setPalavra('');
    }
  };

  function handleAddNewRelationOfLinks(item: RetalationLinksProps) {
    let novoLink = [...novarelacao];
    novoLink.push({ id: '', id_relacao: item.id_post, lk_post: id_post!, titulo: item.titulo });
    setNovaRelacao(novoLink);
  }

  useEffect(() => {
    const getOnePostForIdInfo = async (id_post: string) => {
      const response = await api.getOnePostForId(id_post);
      setValores(response);
      setPostagem(response.postitem);
      setRelacao(response.relacao);
    }
    getOnePostForIdInfo(id_post!);
  }, [id_post]);

  useEffect(() => {
    const AllCategories = async () => {
      const response = await api.getNewCategories();
      if (response) {
        setListaDeCategorias(response);
        setListaDeCategoriasPai(response);
      }
    }
    AllCategories();
  }, [categoria, atualizarCategoria]);

  function onChangeValuesOfInputs(event: { target: { name: any; value: any; }; }) {
    const { name, value } = event.target;
    setValores({ ...valores, [name]: value })

    console.log(value);
  }

  const handleChangeInputPostitem = async (index: number, event: any) => {
    event.preventDefault();

    const values = [...postagem];
    values[index][event.target.name] = event.target.value;

    if (event.target.name === 'imagem') {
      const file = event.target.files[0];
      const base64: any = await converterBase64(file);
      postagem[index].imagem = base64;

      let nomeDasImagens = [...imagem2]
      nomeDasImagens[index] = file || { name: "" };
      setImagem2(nomeDasImagens);

    } else if (event.target.name === 'url_imagem') {
      const url = event.target.value;
      const base64: any = await getDataBlob(url);
      postagem[index].url_imagem = base64;

      let NewUrlListImages = [...urlsImagens]
      NewUrlListImages[index] = url || { name: "" };
      setUrlsImagens(NewUrlListImages);

    } else if (event.target.name === 'video') {
      const file = event.target.files[0];
      const base64: any = await converterBase64(file);
      postagem[index].video = base64;

      var reader = new FileReader();
      var url = URL.createObjectURL(file);

      let NewListVideos = [...videos]
      NewListVideos[index] = url || '';
      setVideos(NewListVideos);
    } else if (event.target.name === 'url_video') {

      let url = event.target.value;

      let url1 = url.replace("https://youtu.be/", "https://www.youtube.com/watch?v=");
      let url2 = url1.replace("watch?v=", "embed/");
      let url3 = url2.replace("&t=", "&start=");

      var letraProcurada = "?";
      var total = [...url3].filter(letra => letra === letraProcurada).length;

      let ulr_modificidada = total < 1 ? url3.replace("&", "?") : url3;

      postagem[index].url_video = ulr_modificidada;

      let NewUrlListVideos = [...urlsVideos]
      NewUrlListVideos[index] = ulr_modificidada || '';
      setUrlsVideos(NewUrlListVideos);

      let newUrlListVideosFormated = [...urlsVideosFormated];
      newUrlListVideosFormated[index] = url || '';
      setUrlsVideosFormated(newUrlListVideosFormated);
    }

    setPostagem(values);
  }

  const converterBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function parseURI(uri: Blob) {
    var reader = new FileReader();
    reader.readAsDataURL(uri);
    return new Promise((resolve, reject) => {
      reader.onload = (event: any) => {
        resolve(event.target.result)
      }
    })
  }

  async function getDataBlob(url: RequestInfo | URL) {
    var response = await fetch(url);
    var blob = await response.blob();
    var uri = await parseURI(blob);
    return uri;
  }

  const handleAddNewStepsOfPostItem = () => {
    setImagem2([...imagem2, { name: "" }]);
    setUrlsImagens([...urlsImagens, ""]);

    setVideos([...videos, ""]);
    setUrlsVideos([...urlsVideos, ""]);
    setUrlsVideosFormated([...urlsVideosFormated, ""]);

    setPostagem([...postagem,
    {
      id_post_item: "",
      lk_post: id_post ? id_post : "",
      ordem: "",
      titulo_passo: "",
      conteudo: "",
      observacao: "",
      imagem: "",
      url_imagem: "",
      video: "",
      url_video: "",
      data_hora: ""
    }
    ]);
  }

  const handleRemovePostItem = (index: number) => {
    const values = [...postagem];

    const valuesImg = [...imagem2];
    const valuesUrlsImagens = [...urlsImagens];

    const valuesVideos = [...videos];
    const valuesUrlsVideos = [...urlsVideos];
    const valuesUrlsVideosFormated = [...urlsVideosFormated];

    values.splice(index, 1);

    valuesImg.splice(index, 1);
    valuesUrlsImagens.splice(index, 1);

    valuesVideos.splice(index, 1);
    valuesUrlsVideos.splice(index, 1);
    valuesUrlsVideosFormated.splice(index, 1);

    setPostagem(values);

    setImagem2(valuesImg);
    setUrlsImagens(valuesUrlsImagens);

    setVideos(valuesVideos);
    setUrlsVideos(valuesUrlsVideos);
    setUrlsVideosFormated(valuesUrlsVideosFormated);
  }

  const handleMovePostItemForUP = (index: number) => {
    const values = [...postagem];

    const valuesImg = [...imagem2];
    const valuesUrlsImagens = [...urlsImagens];

    const valuesVideos = [...videos];
    const valuesUrlsVideos = [...urlsVideos];
    const valuesUrlsVideosFormated = [...urlsVideosFormated];

    let passoAnterior = null;

    let imagemAnterior = null;
    let urlImagemAnterior = null;

    let videoAnterior = null;
    let urlVideoAnterior = null;
    let urlVideoFormatedAnterior = null;

    if (index > 0) {
      passoAnterior = values.splice(index - 1, 1);
      values.splice(index, 0, passoAnterior[0]);

      imagemAnterior = valuesImg.splice(index - 1, 1);
      valuesImg.splice(index, 0, imagemAnterior[0]);

      urlImagemAnterior = valuesUrlsImagens.splice(index - 1, 1);
      valuesUrlsImagens.splice(index, 0, urlImagemAnterior[0]);

      videoAnterior = valuesVideos.splice(index - 1, 1);
      valuesVideos.splice(index, 0, videoAnterior[0]);

      urlVideoAnterior = valuesUrlsVideos.splice(index - 1, 1);
      valuesUrlsVideos.splice(index, 0, urlVideoAnterior[0]);

      urlVideoFormatedAnterior = valuesUrlsVideosFormated.splice(index - 1, 1);
      valuesUrlsVideosFormated.splice(index, 0, urlVideoFormatedAnterior[0]);

      setPostagem(values);

      setImagem2(valuesImg);
      setUrlsImagens(valuesUrlsImagens);

      setVideos(valuesVideos);
      setUrlsVideos(valuesUrlsVideos);
      setUrlsVideosFormated(valuesUrlsVideosFormated);
    }
  }

  const handleMovePostItemForDown = (index: number) => {
    const values = [...postagem];

    const valuesImg = [...imagem2];
    const valuesUrlsImagens = [...urlsImagens];

    const valuesVideos = [...videos];
    const valuesUrlsVideos = [...urlsVideos];
    const valuesUrlsVideosFormated = [...urlsVideosFormated];

    let proximoPasso = null;

    let proximaImagem = null;
    let proximaUrlImagem = null;

    let proximoVideo = null;
    let proximaUrlVideo = null;
    let proximoUrlVideoFormated = null;

    if (index !== values.length - 1) {
      proximoPasso = values.splice(index + 1, 1);
      values.splice(index, 0, proximoPasso[0]);

      proximaImagem = valuesImg.splice(index + 1, 1);
      valuesImg.splice(index, 0, proximaImagem[0]);

      proximaUrlImagem = valuesUrlsImagens.splice(index + 1, 1);
      valuesUrlsImagens.splice(index, 0, proximaUrlImagem[0]);

      proximoVideo = valuesVideos.splice(index + 1, 1);
      valuesVideos.splice(index, 0, proximoVideo[0]);

      proximaUrlVideo = valuesUrlsVideos.splice(index + 1, 1);
      valuesUrlsVideos.splice(index, 0, proximaUrlVideo[0]);

      proximoUrlVideoFormated = valuesUrlsVideosFormated.splice(index + 1, 1);
      valuesUrlsVideosFormated.splice(index, 0, proximoUrlVideoFormated[0]);

      setPostagem(values);

      setImagem2(valuesImg);
      setUrlsImagens(valuesUrlsImagens);

      setVideos(valuesVideos);
      setUrlsVideos(valuesUrlsVideos);
      setUrlsVideosFormated(valuesUrlsVideosFormated);
    }
  }

  const handleRemoveLinkDaNovaRelacao = (index: number) => {
    const values = [...novarelacao];
    values.splice(index, 1);
    setNovaRelacao(values);
  }

  const handleSubmitUpdatePost = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const id_post = valores.id_post;
    const titulo = valores.titulo;
    const resumo = valores.resumo;
    const obs = valores.obs;
    const data_publicacao = valores.data_publicacao;
    const postitem = postagem;
    const relacao = valores.relacao.concat(novarelacao);

    var valores2 = null;

    if (idCategoria !== '' && categoria === '') {
      valores2 = { id_post, titulo, resumo, obs, data_publicacao, publicado, postitem, relacao, lk_categoria: idCategoria }

      // Substitui o ID da categoria pelo novo ID selecionado
    } else if (categoria !== "Nenhuma") {
      valores2 = { id_post, titulo, resumo, obs, data_publicacao, publicado, postitem, relacao, lk_categoria: categoria }
    } else {
      valores2 = { id_post, titulo, resumo, obs, data_publicacao, publicado, postitem, relacao, lk_categoria: nenhuma }
    }

    console.log(valores2);

    const response = await api.updatePost(id, valores2);

    if (response.status === 'error') {
      setError(response.message);
    } else {

      navigate(`/postDetails/${id_post}`);
    }
  }

  const handleChangeIdPostitem = (index: number) => {
    setPosicaoPostItem(index)
    const id_item = postagem[index].id_post_item
    setIdItem(id_item)
  }

  async function handleDetelePostItem() {

    if (idItem !== '') {

      const response = await api.deletePostItem(idItem);
      console.log("USAR TOST INFORMATIVO PRA EXIBIR NA TELA ", response);
      console.log("PostItem a ser excluido ", idItem);

      const values = [...postagem];

      const valuesImg = [...imagem2];
      const valuesUrlsImagens = [...urlsImagens];

      const valuesVideo = [...videos];
      const valuesUrlsVideos = [...urlsVideos];
      const valuesUrlsVideosFormated = [...urlsVideosFormated];

      values.splice(posicaoPostItem, 1);

      valuesImg.splice(posicaoPostItem, 1);
      valuesUrlsImagens.splice(posicaoPostItem, 1);

      valuesVideo.splice(posicaoPostItem, 1);
      valuesUrlsVideos.splice(posicaoPostItem, 1);
      valuesUrlsVideosFormated.splice(posicaoPostItem, 1);

      setPostagem(values);

      setImagem2(valuesImg);
      setUrlsImagens(valuesUrlsImagens);

      setVideos(valuesVideo);
      setUrlsVideos(valuesUrlsVideos);
      setUrlsVideosFormated(valuesUrlsVideosFormated);

    } else {
      const values = [...postagem];

      const valuesImg = [...imagem2];
      const valuesUrlsImagens = [...urlsImagens];

      const valuesVideo = [...videos];
      const valuesUrlsVideos = [...urlsVideos];
      const valuesUrlsVideosFormated = [...urlsVideosFormated];

      values.splice(posicaoPostItem, 1);

      valuesImg.splice(posicaoPostItem, 1);
      valuesUrlsImagens.splice(posicaoPostItem, 1);

      valuesVideo.splice(posicaoPostItem, 1);
      valuesUrlsVideos.splice(posicaoPostItem, 1);
      valuesUrlsVideosFormated.splice(posicaoPostItem, 1);

      setPostagem(values);

      setImagem2(valuesImg);
      setUrlsImagens(valuesUrlsImagens);

      setVideos(valuesVideo);
      setUrlsVideos(valuesUrlsVideos);
      setUrlsVideosFormated(valuesUrlsVideosFormated);
    }
  }

  async function handleRemoveLinkOfPostWithRelation() {

    if (idLink !== '') {

      const response = await api.deleteLinkRelation(idLink);

      console.log("USAR TOST INFORMATIVO PRA EXIBIR NA TELA ", response);
      console.log("ID LINK RELAÇÂO A SER EXCLUIDO ", idLink);
    }

    const values = [...relacao];
    values.splice(Number(posicaoLinkRelacao), 1);
    setRelacao(values);
  }


  const handleCapturaIdLink = (index: number) => {
    setPosicaoLinkRelacao(index)

    const id_Link = relacao[index].id
    setIdLink(id_Link)
  }

  return (
    <Container>
      <form encType="multipart/form-data" method="PUT">

        {/* ADD NEW CATEGORIES */}
        <AreaCategory>
          <div>
            <div className="categories">
              <label> Escolha uma Categoria:</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <option value=''>
                  {novaCategoria?.[0]?.descricao ? novaCategoria?.[0]?.descricao
                    : valores.categoria?.[0]?.descricao ? valores.categoria?.[0]?.descricao
                      : 'Nenhuma'}
                </option>
                <option>Nenhuma</option>

                {
                  listaDeCategorias.map((category) => (
                    <Fragment key={category.id}>
                      <option
                        value={category.id}
                        className="category-pai"
                      >
                        {category.descricao}
                      </option>
                      {
                        listaDeCategorias &&
                        category.sub?.map((subcategory) => (
                          <option
                            key={subcategory.id}
                            value={subcategory.id}
                            onClick={() => setCategoria}
                            className="subcategory"
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp; {subcategory.descricao && subcategory.descricao}
                          </option>
                        ))
                      }
                    </Fragment>
                  ))}
              </select>
            </div>
            <div className="publicado">
              <label>Publicar</label>
              <select onChange={(event) => setPublicado(event.target.value)}>

                {valores.publicado === '1' ?
                  <>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </>
                  :

                  <>
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                  </>
                }
              </select>
            </div>
          </div>

          {/* BUTTON OF MODAL OF ADD NEW CATEGORY */}
          <Dialog.Root>
            <ModalAddNewCategory
              idCategoriaPai={idCategoriaPai}
              setIdCategoriaPai={setIdCategoriaPai}
              listaDeCategoriasPai={listaDeCategoriasPai}
            />
          </Dialog.Root>
          {/* FIM OF MODAL OF ADD NEW CATEGORY */}
        </AreaCategory>

        {/* FORMULÁRIO DE ATUALIZAÇÃO */}
        <AreaEditPost>
          <label>Titulo:</label>
          <input
            type="text"
            name="titulo"
            defaultValue={valores.titulo}
            onChange={onChangeValuesOfInputs}
            className="form-control" placeholder="Digite um título">
          </input>

          <label>Resumo:</label>
          <textarea
            name="resumo"
            onChange={onChangeValuesOfInputs}
            value={valores.resumo}
          >
          </textarea>

          <label>Observações:</label>
          <textarea
            name="obs"
            onChange={onChangeValuesOfInputs}
            value={valores.obs ? valores.obs : ''}
          >
          </textarea>
        </AreaEditPost>

        {postagem &&

          postagem.map((pItem, index) => (
            <AreaNewPostItem key={index}>
              <input
                hidden
                disabled
                id="ordem"
                type="text"
                name="ordem"
                value={pItem.ordem = String(index + 1)}
              />

              <label id="titulo_passo">Passo:</label>
              <input
                type="text"
                id="titulo_passo"
                name="titulo_passo"
                value={pItem.titulo_passo || ''}
                placeholder="Ex: Cadastrar produto..."
                onChange={event => handleChangeInputPostitem(index, event)}
              />

              <label id="conteudo">Conteudo:</label>
              <textarea
                id="conteudo"
                name="conteudo"
                value={pItem.conteudo || ''}
                onChange={event => handleChangeInputPostitem(index, event)}
              >
              </textarea>

              <label>Adicionar um arquivo de imagem:</label>
              <LabelFile htmlFor={`input${index}`}>
                <PlusCircle size={30} />
              </LabelFile>

              {
                imagem2?.[index]?.name ?
                  <AreaImage>
                    <ImageDetails className="img-passos" src={URL.createObjectURL(imagem2?.[index])} />
                  </AreaImage>
                  : pItem.imagem ?
                    <AreaImage>
                      <ImageDetails src={pItem.imagem} className="img-passos" />
                    </AreaImage>
                    : ""
              }

              <InputFile
                type="file"
                name="imagem"
                accept="image/*"
                id={`input${index}`}
                onChange={event => handleChangeInputPostitem(index, event)}
              />

              <label>Adicionar um Link de imagem</label>
              <LinkImagemInput
                type="text"
                name="url_imagem"
                value={urlsImagens[index] || ""}
                onChange={event => handleChangeInputPostitem(index, event)}
              />

              {urlsImagens[index] ?
                <AreaImage>
                  <ImageDetails src={urlsImagens[index]} alt="" />
                </AreaImage>
                : pItem.url_imagem ?
                  <AreaImage>
                    <ImageDetails src={pItem.url_imagem} alt="" />
                  </AreaImage>
                  : ""
              }

              <label>Adicionar um arquivo de video:</label>
              <LabelFile htmlFor={`inputVideo${index}`}>
                <PlusCircle size={30} />
              </LabelFile>

              <InputFile
                type="file"
                name="video"
                accept=".mp4"
                id={`inputVideo${index}`}
                onChange={event => handleChangeInputPostitem(index, event)}
              />

              {
                videos[index] ?
                  <div className="video">
                    <iframe
                      id="player"
                      title="video"
                      frameBorder="0"
                      allow="autoplay 'none'"
                      src={videos[index]}
                    >
                    </iframe>
                  </div>
                  :
                  pItem.video ?
                    <div className="video">
                      <iframe
                        id="player"
                        title="video"
                        frameBorder="0"
                        src={pItem.video}
                        allow="fullscreen"
                      >
                      </iframe>
                    </div>

                    : ""
              }

              <label>Adicionar um Link de Video</label>
              <LinkVideoInput
                type="text"
                name="url_video"
                value={urlsVideosFormated[index] || ""}
                onChange={event => handleChangeInputPostitem(index, event)}
              />

              {
                urlsVideos[index] ?
                  <div className="video">
                    <iframe
                      id="player"
                      title="video"
                      frameBorder="0"
                      allow="fullscreen"
                      src={urlsVideos[index]}
                    >
                    </iframe>
                  </div>

                  : pItem.url_video ?

                    <div className="video">
                      <iframe
                        id="player"
                        title="video"
                        frameBorder="0"
                        allow="fullscreen"
                        src={pItem.url_video}
                      >
                      </iframe>
                    </div>

                    : ""
              }

              <label id="observacao">Observações:</label>
              <textarea
                id="observacao"
                name="observacao"
                value={pItem.observacao ? pItem.observacao : ''}
                onChange={event => handleChangeInputPostitem(index, event)}
              >
              </textarea>

              <AreaButtonPassos>
                <Dialog.Root>
                  <ModalDeletePostItem
                    index={index}
                    handleChangeIdPostitem={handleChangeIdPostitem}
                    handleDetelePostItem={handleDetelePostItem}
                  />
                </Dialog.Root>

                <span onClick={() => handleMovePostItemForUP(index)}>
                  <ArrowCircleUp size={30} /> Mover para Acima
                </span>

                <span onClick={() => handleMovePostItemForDown(index)}>
                  <ArrowCircleDown size={30} /> Mover para Abaixo
                </span>

              </AreaButtonPassos>
            </AreaNewPostItem>
          ))
        }

        <AreaPostsRelacionados>
          <label id="ordenacao">Links Relacionados: </label>
          <ul>
            {
              relacao?.map((item, index) =>
                <li key={item.id}>
                  <div>
                    <LinkSimple size={20} />
                  </div>
                  <span >{item.titulo}</span>
                  <Dialog.Root>
                    <ModalDeleteLinkRelation
                      id={index}
                      handleCapturaIdLink={handleCapturaIdLink}
                      handleRemoveLinkOfPostWithRelation={handleRemoveLinkOfPostWithRelation}
                    />
                  </Dialog.Root>
                </li>
              )
            }

            {novarelacao &&
              novarelacao.map((item, index) =>
                <li key={index}>
                  <div>
                    <LinkSimple size={20} />
                  </div>
                  <span >{item.titulo}</span>
                  <div>
                    <Trash onClick={() => handleRemoveLinkDaNovaRelacao(index)} className="trash-link" />
                  </div>
                </li>
              )
            }
          </ul>
        </AreaPostsRelacionados>

        <AreaOfPassos>
          <span onClick={() => handleAddNewStepsOfPostItem()}>
            <PlusCircle size={34} weight="fill" className="add_passos" /> Passos
          </span>

          {/* BUTTON OF MODAL OF ADD LINKS RELATIONS */}
          <span>
            <Dialog.Root>
              <ModalAddLinkRelation
                palavra={palavra}
                listOfLinksWithRelations={listOfLinksWithRelations}
                handleAddNewRelationOfLinks={handleAddNewRelationOfLinks}
                handleSearchOfLinksWithRelations={handleSearchOfLinksWithRelations}
                handleChangeInputOfLinksWithRelations={handleChangeInputOfLinksWithRelations}
              />
            </Dialog.Root>
          </span>
          {/* FIM OF MODAL OF ADD LINKS RELATIONS */}

          <ButtonCancel type="button">
            <NavLink to="/home">Cancelar</NavLink>
          </ButtonCancel>

          <ButtonSave type="button" onClick={handleSubmitUpdatePost}>
            Salvar
          </ButtonSave>

        </AreaOfPassos>
      </form>
    </Container>
  );
}