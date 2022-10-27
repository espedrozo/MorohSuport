import { Player } from "video-react";
import { api } from "../../../../lib/Api";
import * as Dialog from '@radix-ui/react-dialog';
import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ModalAddNewCategory } from "../../../../components/ModalAddNewCategory";
import { ModalAddLinkRelation } from "../../../../components/ModalAddLinkRelation";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  LinkSimple,
  MinusCircle,
  PlusCircle,
  Trash
} from "phosphor-react";
import {
  AreaCategory,
  Container,
  AreaNewPost,
  AreaNewPostItem,
  AreaOfPassos,
  AreaPostsRelacionados,
  AreaButtonPassos,
  ButtonCancel,
  ButtonSave,
  InputFile,
  LabelFile,
  ImageDetails,
  LinkVideoInput,
  LinkImagemInput
} from "./styles";

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

import { useContextSelector } from "use-context-selector";
import { PostesContext } from "../../../../contexts/PostsContext";

export function NewPostForm() {

  let navigate = useNavigate();

  const {
    reloadContext,
    setReloadContext,
  } = useContextSelector(PostesContext, (context) => {
    return context
  });

  const [videos, setVideos] = useState([""]);
  const [urlsVideos, setUrlsVideos] = useState([""]);
  const [urlsVideosFormated, setUrlsVideosFormated] = useState([""]);
  const [urlsImagens, setUrlsImagens] = useState([""]);
  const [categoria, setCategoria] = useState('');
  const [idCategoriaPai, setIdCategoriaPai] = useState('');
  const [listaDeCategorias, setListaDeCategorias] = useState<ListCategoriesProps[]>([]);
  const [listaDeCategoriasPai, setListaDeCategoriasPai] = useState<ListaDeCategoriesPaiProps[]>([]);

  const [novaCategoria, setNovaCategoria] = useState([
    {
      id_cat: '',
      descricao: '',
      id_pai: ''
    }
  ]);

  const [relacao, setRelacao] = useState<RelacaoProps[]>([]);
  const [listOfLinksWithRelations, setListOfLinksWithRelations] = useState([]);

  const [id_post, setId_Post] = useState('');
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [obs, setObs] = useState('');
  const [data_publicacao, setData_Publicacao] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [palavra, setPalavra] = useState('');
  const [valorInput, setValorInput] = useState('');

  // Salva os dados dos passos, para ser enviado como um objeto.
  const [postitem, setPostItem] = useState([
    {
      id_post_item: '',
      lk_post: id_post,
      ordem: '',
      titulo_passo: '',
      conteudo: '',
      observacao: '',
      imagem: '',
      url_imagem: '',
      video: '',
      url_video: '',
      data_hora: ''
    }
  ]);

  const [imagem2, setImagem2] = useState([{ name: "" }]);

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

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await api.getNewCategories();
      if (response) {
        setListaDeCategorias(response);
        setListaDeCategoriasPai(response);
      }
    }
    getAllCategories();
  }, [categoria, reloadContext]);

  const handleChangeInputPostItem = async (index: number, event: any) => {
    const values = [...postitem];

    values[index][event.target.name] = event.target.value;

    //const values = [...postitem.filter(item => item === event.target.name ? event.target.value : "")]

    if (event.target.name === 'imagem') {
      const file = event.target.files[0];
      const base64 = await convertionForBase64(file);
      postitem[index].imagem = base64;

      let nomeDasImagens = [...imagem2]
      nomeDasImagens[index] = file || { name: "" };
      setImagem2(nomeDasImagens);

    } else if (event.target.name === 'url_imagem') {

      const url = event.target.value;
      const base64 = await getDataBlob(url);

      postitem[index].url_imagem = base64;
      let NewUrlListImages = [...urlsImagens]

      NewUrlListImages[index] = url || '';
      setUrlsImagens(NewUrlListImages);

    } else if (event.target.name === 'video') {

      const file = event.target.files[0];
      const base64 = await convertionForBase64(file);

      postitem[index].video = base64;

      var reader = new FileReader();
      var url = URL.createObjectURL(file);

      let NewListVideos = [...videos];
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

      postitem[index].url_video = ulr_modificidada;

      let newUrlListVideos = [...urlsVideos];
      newUrlListVideos[index] = ulr_modificidada || '';
      setUrlsVideos(newUrlListVideos);

      let newUrlListVideosFormated = [...urlsVideosFormated];
      newUrlListVideosFormated[index] = url || '';
      setUrlsVideosFormated(newUrlListVideosFormated);
    }

    setPostItem(values);
  }

  async function parseURI(uri: any) {
    var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
    reader.readAsDataURL(uri);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
    return new Promise((resolve, reject) => {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
      reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
        resolve(e.target.result)
      }
    })
  }

  async function getDataBlob(url: any) {
    var response = await fetch(url);
    var blob = await response.blob();
    var uri = await parseURI(blob);
    return uri;
  }

  const convertionForBase64 = (file: Blob) => {
    if (file) {
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
    }
  };

  const handleAddNewStepsOfPostItem = () => {
    setImagem2([...imagem2, { name: "" }]);
    setUrlsImagens([...urlsImagens, ""]);

    setVideos([...videos, ""]);
    setUrlsVideos([...urlsVideos, ""]);
    setUrlsVideosFormated([...urlsVideosFormated, ""]);

    setPostItem([...postitem,
    {
      id_post_item: "",
      lk_post: id_post,
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
    const values = [...postitem];

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

    setPostItem(values);

    setImagem2(valuesImg);
    setUrlsImagens(valuesUrlsImagens);

    setVideos(valuesVideos);
    setUrlsVideos(valuesUrlsVideos);
    setUrlsVideosFormated(valuesUrlsVideosFormated);
  }

  const handleMovePostItemForUP = (index: number) => {
    const values = [...postitem];

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

      setPostItem(values);

      setImagem2(valuesImg);
      setUrlsImagens(valuesUrlsImagens);

      setVideos(valuesVideos);
      setUrlsVideos(valuesUrlsVideos);
      setUrlsVideosFormated(valuesUrlsVideosFormated);
    }
  }

  const handleMovePostItemForDown = (index: number) => {
    const values = [...postitem];

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

      setPostItem(values);

      setImagem2(valuesImg);
      setUrlsImagens(valuesUrlsImagens);

      setVideos(valuesVideos);
      setUrlsVideos(valuesUrlsVideos);
      setUrlsVideosFormated(valuesUrlsVideosFormated);
    }
  }

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
    let newListOfLinks = [...relacao];
    newListOfLinks.push(
      {
        id: '',
        id_relacao: item.id_post,
        lk_post: '',
        titulo: item.titulo
      }
    );
    setRelacao(newListOfLinks);
  }

  const handleRemoveLinkOfPostWithRelation = (index: number) => {
    const values = [...relacao];
    values.splice(index, 1);
    setRelacao(values);
  }

  const handleSubmitCreateNewPost = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    if (novaCategoria[0]['descricao'] !== '' && categoria === '') {

      novaCategoria[0]['id_pai'] = idCategoriaPai;

      await api.createPost(
        {
          id_post,
          titulo,
          resumo,
          obs,
          data_publicacao,
          postitem,
          cat: novaCategoria,
          relacao
        }
      );
    } else {
      await api.createPost(
        {
          id_post,
          titulo,
          resumo,
          obs,
          data_publicacao,
          postitem,
          cat: categoria,
          relacao
        }
      );
    }

    if (error) {
      setError(error)
      setDisabled(false)
    } else {
      setReloadContext(!reloadContext);
      navigate("/home");
    }
  }

  return (
    <Container>
      <form encType="multipart/form-data" method="POST">

        {/* ADICIONAR NOVAS CATEGORIAS */}
        <AreaCategory>
          <div>
            <label> Escolha uma Categoria:</label>
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value=""> {novaCategoria?.[0]?.descricao ? novaCategoria?.[0]?.descricao : 'Nenhuma'} </option>
              {listaDeCategorias &&
                listaDeCategorias.map((category) => (
                  <Fragment key={category.id}>
                    <option value={category.id} className="category-pai">{category.descricao}</option>
                    {
                      listaDeCategorias &&
                      category.sub?.map((subcategory) => (
                        <option key={subcategory.id}
                          value={subcategory.id}
                          onChange={() => setCategoria}
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

        <AreaNewPost>
          <label id="title">Titulo:</label>
          <input
            type="text"
            name="titulo"
            disabled={disabled}
            value={titulo}
            onChange={event => setTitulo(event.target.value)}
            placeholder="Digite um título"
          />
          <label id="resumo">Resumo:</label>
          <textarea
            id="resumo"
            name="resumo"
            disabled={disabled}
            value={resumo}
            onChange={e => setResumo(e.target.value)}
          >
          </textarea>

          <label id="conteudo">Observações:</label>
          <textarea
            id="conteudo"
            name="obs"
            disabled={disabled}
            value={obs}
            onChange={e => setObs(e.target.value)}
          >
          </textarea>
        </AreaNewPost>

        {
          postitem.map((pItem, index) => (
            <AreaNewPostItem key={index}>
              <input
                hidden
                disabled
                id="ordem"
                type="text"
                name="ordem"
                value={pItem.ordem = String(index + 1)}
              />
              <label id="titulo_passo">Passo: </label>
              <input
                type="text"
                id="titulo_passo"
                name="titulo_passo"
                value={pItem.titulo_passo || ''}
                placeholder="Ex: Cadastrar produto..."
                onChange={event => handleChangeInputPostItem(index, event)}
              />
              <label id="conteudo">Conteudo:</label>
              <textarea
                id="conteudo"
                name="conteudo"
                value={pItem.conteudo || ''}
                onChange={event => handleChangeInputPostItem(index, event)}
              >
              </textarea>

              <label>Adicionar um arquivo de imagem:</label>
              <LabelFile htmlFor={`input${index}`}>
                <PlusCircle size={30} />
              </LabelFile>

              {
                imagem2?.[index]?.name &&
                <ImageDetails className="img-passos" src={URL.createObjectURL(imagem2?.[index])} />
              }

              <InputFile
                type="file"
                name="imagem"
                accept="image/*"
                id={`input${index}`}
                onChange={event => handleChangeInputPostItem(index, event)}
              />

              <label>Adicionar um Link de imagem</label>
              <LinkImagemInput
                type="text"
                name="url_imagem"
                value={urlsImagens[index] || ""}
                onChange={event => handleChangeInputPostItem(index, event)}
              />

              {urlsImagens[index] ?
                <div>
                  <ImageDetails src={urlsImagens[index]} alt="" />
                </div>
                : ''
              }

              <label>Adicionar um arquivo de vídeo:</label>
              <LabelFile htmlFor={`inputVideo${index}`}>
                <PlusCircle size={30} />
              </LabelFile>

              <InputFile
                type="file"
                name="video"
                accept=".mp4"
                id={`inputVideo${index}`}
                onChange={event => handleChangeInputPostItem(index, event)}
              />

              {
                videos[index] &&
                <div className="video">
                  <iframe
                    id="player"
                    title="video"
                    frameBorder="0"
                    allow="fullscreen"
                    src={videos[index]}
                  >
                  </iframe>
                </div>
              }

              <label>Adicionar um Link de Video</label>
              <LinkVideoInput
                type="text"
                name="url_video"
                value={urlsVideos[index] || ""}
                onChange={event => handleChangeInputPostItem(index, event)}
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

                  : ""
              }

              <label id="observacao">Observações:</label>
              <textarea
                id="observacao"
                name="observacao"
                value={pItem.observacao || ''}
                onChange={event => handleChangeInputPostItem(index, event)}
              >
              </textarea>

              <AreaButtonPassos>
                <span onClick={() => handleRemovePostItem(index)}>
                  <MinusCircle size={30} className="remover_passo" /> Remover passo
                </span>

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
                <li key={index}>
                  <div>
                    <LinkSimple size={20} />
                  </div>
                  <span>{item.titulo}</span>
                  <div>
                    <Trash onClick={() => handleRemoveLinkOfPostWithRelation(index)} className="trash-link" />
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

          <ButtonSave type="button" onClick={handleSubmitCreateNewPost}>
            Salvar
          </ButtonSave>

        </AreaOfPassos>
      </form>
    </Container>
  )
}