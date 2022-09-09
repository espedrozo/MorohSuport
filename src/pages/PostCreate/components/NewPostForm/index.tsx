import { ArrowCircleDown, ArrowCircleUp, Check, MinusCircle, PlusCircle, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  ImageDetails
} from "./styles";

import { Player } from "video-react";


/* TIPAGENS */
interface RelacaoProps {
  id: string;
  id_relacao: string;
  lk_post: string;
  titulo: string;
}


export function NewPostForm() {

  let navigate = useNavigate();


  const [videos, setVideos] = useState([""]);
  const [categoria, setCategoria] = useState('');
  const [idCategoriaPai, setIdCategoriaPai] = useState('');
  const [idCategoriaExluir, setIdCategoriaExluir] = useState('');
  const [listaDeCategorias, setListaDeCategorias] = useState([]);
  const [listaDeCategoriasPai, setListaDeCategoriasPai] = useState([]);


  console.log('videos: ', videos)
  const [novaCategoria, setNovaCategoria] = useState([
    {
      id_cat: '',
      descricao: '',
      id_pai: null
    }
  ])

  const [nomeDaNovaCategoria, setNomeDaNovaCategoria] = useState([
    {
      id_cat: '',
      descricao: '',
      id_pai: idCategoriaPai
    }
  ])

  const [relacao, setRelacao] = useState<RelacaoProps[]>([]);
  const [mostrarLinksRelacionados, setMostrarLinksRelacionados] = useState(true);
  const [listaDeLinksRelacionados, setListaDeLinksRelacionados] = useState([]);

  //Criando states para pegar os dados vindos dos inputs, para serem enviados para a API.
  const [id_post, setId_Post] = useState('');
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [obs, setObs] = useState('');
  const [data_publicacao, setData_Publicacao] = useState('');

  // Desabilita os inputs quando houver erro e mostra os erros
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  // String a ser pesquisada
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
      video: '',
      data_hora: ''
    }
  ]);

  const [imagem2, setImagem2] = useState([{ name: "" }]);

  // Captura o ID para ser excluido
  /*   const handleIdCategoria = (e) => {
      setIdCategoriaExluir(e)
    }
   */
  // Excluir uma categoria pelo ID
  const handleExcluirCategora = () => {
    const deleteCategoria = async (idCategoriaExluir: string) => {
      //let json = await api.deleteCategoria(idCategoriaExluir);
    }
    deleteCategoria(idCategoriaExluir);
    sessionStorage.removeItem('categorias');
    sessionStorage.removeItem('idCategorias');
    window.location.reload();
  }

  /* 
 // Esta função adiciona uma nova categoria ao banco
 async function handleNovaCategoria(nomeDaNovaCategoria) {
   nomeDaNovaCategoria[0]['id_pai'] = idCategoriaPai;
   setNovaCategoria(nomeDaNovaCategoria);

   //const json = await api.criarNovaCat(nomeDaNovaCategoria[0]);

      if (error) {
         setError(error)
       } else {
         sessionStorage.removeItem('categorias');
         sessionStorage.removeItem('idCategorias');
         setCategoria(json);
       }
       
     }
 */

  // Exibindo todos os posts da aplicação
  useEffect(() => {
    const totalPosts = async () => {
      if (palavra) {
        /* const json = await api.getPosts({ palavra });
        if (json) {
          setListaDeLinksRelacionados(json);
        } */
      }
    }
    totalPosts();
  }, [palavra]);

  // Exibindo as novas categorias
  useEffect(() => {
    const Categorias = async () => {
      /* const cat = await api.getNovasCategorias();
      if (cat) {
        setListaDeCategorias(cat);
        setListaDeCategoriasPai(cat);
      } */
    }
    Categorias();
  }, [categoria]);

  /*   // Essa função pesquisa a palava que contenha no titulo dos links relacionados
    const handleChangeInputLinksRelacionados = (e) => {
      if (e !== '') {
        setValorInput(e);
      } else {
        setPalavra('');
      }
    };
  
    // Recebe as informações passadas pelo input do formulário de atualização
    const handleBuscarLinksRelacionados = async (e) => {
      e.preventDefault();
      if (e !== '') {
        setPalavra(valorInput);
      } else {
        setPalavra('');
      }
    }; */

  // Captura os dados vindos dos INPUTs e salva no state (postitem)
  const handleChangeInputPostitem = async (index: number, event) => {
    const values = [...postitem];



    for (var i = 0; i < values.length; ++i) {
      values[index][event.target.name] = event.target.value;
    }



    if (event.target.name === 'imagem') {
      const file: Blob = event.target.files[0];
      const base64 = await converterBase64(file);
      postitem[index].imagem = base64;

      let nomeDasImagens = [...imagem2]
      nomeDasImagens[index] = file || { name: "" };
      setImagem2(nomeDasImagens);

    } else if (event.target.name === 'video') {
      const file = event.target.files[0];
      const base64 = await converterBase64(file);
      postitem[index].video = base64;

      var reader = new FileReader();
      var url = URL.createObjectURL(file);

      let NewListVideos = [...videos]
      NewListVideos[index] = url || '';
      setVideos(NewListVideos);
    }

    setPostItem(values);
  }
  /* 
    const handleChangeInputNovaCategoria = async (id_cat, event) => {
  
  
  
      const values = [...nomeDaNovaCategoria];
      values[id_cat][event.target.name] = event.target.value;
      setNomeDaNovaCategoria(values);
    }
   */
  // Função que converte uma imagem para a base64
  const converterBase64 = (file: Blob) => {
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

  //Adiciona uma DIV com mais passos.
  const handleAddNewStepsOfPostItem = () => {
    setImagem2([...imagem2, { name: "" }]);
    setVideos([...videos, ""]);
    setPostItem([...postitem,
    {
      id_post_item: "",
      lk_post: id_post,
      ordem: "",
      titulo_passo: "",
      conteudo: "",
      observacao: "",
      imagem: "",
      video: "",
      data_hora: ""
    }
    ]);
  }

  //Exclui uma DIV com novos passos através do index, pois não possue ID.
  const handleRemoverPostitem = (index: number) => {
    const values = [...postitem];
    const valuesImg = [...imagem2];
    const valuesVideos = [...videos];

    values.splice(index, 1);
    valuesImg.splice(index, 1);
    valuesVideos.splice(index, 1);

    setPostItem(values);
    setImagem2(valuesImg);
    setVideos(valuesVideos);
  }

  const handleMoverPostitemParaCima = (index: number) => {
    const values = [...postitem];
    const valuesImg = [...imagem2];
    const valuesVideos = [...videos];

    let passoAnterior = null;
    let imagemAnterior = null;
    let videoAnterior = null;

    if (index > 0) {
      passoAnterior = values.splice(index - 1, 1);
      values.splice(index, 0, passoAnterior[0]);

      imagemAnterior = valuesImg.splice(index - 1, 1);
      valuesImg.splice(index, 0, imagemAnterior[0]);

      videoAnterior = valuesVideos.splice(index - 1, 1);
      valuesVideos.splice(index, 0, videoAnterior[0]);

      setPostItem(values);
      setImagem2(valuesImg);
      setVideos(valuesVideos);
    }
  }

  const handleMoverPostitemParaBaixo = (index: number) => {
    const values = [...postitem];
    const valuesImg = [...imagem2];
    const valuesVideos = [...videos];

    let proximoPasso = null;
    let proximaImagem = null;
    let ProximoVideo = null;

    if (index !== values.length - 1) {
      proximoPasso = values.splice(index + 1, 1);
      values.splice(index, 0, proximoPasso[0]);

      proximaImagem = valuesImg.splice(index + 1, 1);
      valuesImg.splice(index, 0, proximaImagem[0]);

      ProximoVideo = valuesVideos.splice(index + 1, 1);
      valuesVideos.splice(index, 0, ProximoVideo[0]);

      setPostItem(values);
      setImagem2(valuesImg);
      setVideos(valuesVideos);
    }
  }

  /*   // Função para adicionar novos links de posts relacionados
    function novaRelacaoDeLinks(item) {
      let novoLink = [...relacao];
      novoLink.push({ id: '', id_relacao: item.id_post, lk_post: '', titulo: item.titulo });
      setRelacao(novoLink)
    } */

  // Função para remover novos links através do index, pois não possue ID.
  const handleRemoverLink = (index: number) => {
    const values = [...relacao];
    values.splice(index, 1);
    setRelacao(values);
  }

  /*  // Função que vai enviar os dados do formulario pelo método (POST) e salvar no banco de dados
   const handleSubmitCadastrarPost = async (e) => {
     e.preventDefault();
     setDisabled(true);
     setError('');
 
     if (novaCategoria[0]['descricao'] !== '' && categoria === '') {
 
            novaCategoria[0]['id_pai'] = idCategoriaPai;
      
            const json = await api.criarPost(
              id_post,
              titulo,
              resumo,
              obs,
              data_publicacao,
              postitem,
              novaCategoria,
              relacao,
            ); 
     } else {
       const json = await api.criarPost(
          id_post,
          titulo,
          resumo,
          obs,
          data_publicacao,
          postitem,
          categoria,
          relacao,
        ); 
     }
 
     if (error) {
       setError(error)
       setDisabled(false)
     } else {
       sessionStorage.removeItem('categorias');
       sessionStorage.removeItem('idCategorias');
 
       navigate("/home");
     }
   }
  */
  console.log('POST_ITEM: ', postitem);

  return (
    <Container>
      <form action="">
        <AreaCategory>
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
        </AreaCategory>
        <AreaNewPost>
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
        </AreaNewPost>

        {
          postitem.map((pItem, index) => (
            <AreaNewPostItem key={index}>
              {/* <label id="ordem">Passo: </label> */}
              <input
                type="text"
                name="ordem"
                disabled
                hidden
                value={pItem.ordem = String(index + 1)}
                id="ordem"
              />
              <label id="titulo_passo">Passo: </label>
              <input
                type="text"
                name="titulo_passo"
                value={pItem.titulo_passo}
                onChange={event => handleChangeInputPostitem(index, event)}
                id="titulo_passo"
                placeholder="Ex: Cadastrar produto..."
              />
              <label id="conteudo">Conteudo:</label>
              <textarea
                name="conteudo"
                value={pItem.conteudo || ''}
                onChange={event => handleChangeInputPostitem(index, event)}
                id="conteudo">

              </textarea>
              <label>Adicionar uma imagem:</label>
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
                onChange={event => handleChangeInputPostitem(index, event)}
              />

              <label>Adicionar um video:</label>
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
                videos[index] &&
                <Player
                  playsInline
                  width={300}
                  height={200}
                  fluid={false}
                  src={videos[index]}
                />
              }

              <label id="conteudo">Observações:</label>
              <textarea
                name="observacao"
                value={pItem.observacao || ''}
                onChange={event => handleChangeInputPostitem(index, event)}
                id="conteudo" >
              </textarea>

              <AreaButtonPassos>
                <span onClick={() => handleRemoverPostitem(index)}>
                  <MinusCircle size={30} className="remover_passo" /> Remover passo
                </span>

                <span onClick={() => handleMoverPostitemParaCima(index)}>
                  <ArrowCircleUp size={30} /> Mover para Acima
                </span>

                <span onClick={() => handleMoverPostitemParaBaixo(index)}>
                  <ArrowCircleDown size={30} /> Mover para Abaixo
                </span>

              </AreaButtonPassos>
            </AreaNewPostItem>
          ))
        }
        <AreaPostsRelacionados>
          <label id="ordenacao">Tópicos Relacionados: </label>
          <ul>
            <li>
              <Check size={20} />
              <span className="mr-2 text-dark">Salvar em PDF</span>
              {/* <Trash size={20} /> */}
            </li>
            <li>
              <Check size={20} />
              <span className="mr-2 text-dark">Imprimir Nota Fiscal</span>
              {/* <Trash size={20} /> */}
            </li>
            <li>
              <Check size={20} />
              <span className="mr-2 text-dark">Gerar Boletos</span>
              {/* <Trash size={20} /> */}
            </li>
          </ul>
        </AreaPostsRelacionados>

        <AreaOfPassos>
          <span onClick={() => handleAddNewStepsOfPostItem()}>
            <PlusCircle size={34} weight="fill" className="add_passos" /> Passos
          </span>

          <span>
            <PlusCircle size={34} weight="fill" className="add_links" /> Links
          </span>

          <ButtonCancel type="button">
            <NavLink to="/home">Cancelar</NavLink>
          </ButtonCancel>

          <ButtonSave type="button">Salvar</ButtonSave>

        </AreaOfPassos>
      </form>
    </Container>
  )
}