import { Context, ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector'
import { api } from '../lib/Api';

interface Post {
  id_post: string;
  titulo: string
  resumo: string;
  data_publicacao: string
}

type SubProps = {
  id: string;
  tipo: string;
  descricao: string;
  lk_categoria: string;
}

type SubCategoriaProps = {
  id_pai: string;
  id: string;
  tipo: string;
  descricao: string
  lk_categoria: string;
  sub?: SubProps[];
}

type Category = {
  id: string;
  descricao: string;
  id_pai: string;
  tipo: string;
  subcategoria?: SubCategoriaProps[]
}

interface CreatePostInput {
  id_post: string;
  titulo: string;
  resumo: string;
  data_publicacao: string;
}

interface PostContextType {
  totalDePosts: Post[];
  totalPaginas: number;
  limitePaginacao: number;
  limiteApi: number;
  paginaAtual: number;
  setPaginaAtual: (item: number) => void;
  paginaAtualDaPaginacao: number;
  setPaginaAtualDaPaginacao: (item: number) => void;
  setLimiteApi: (item: number) => void;
  paginacaoDePosts: Post[] | undefined;
  paginacaoDePostsComBusca: Post[] | undefined;
  palavra: string | null
  handleSubmit: (e: any) => Promise<void>;
  handleChange: (e: any) => void;

  posts: Post[];
  categories: Category[];

  listOfCategories: Category[];
  setListOfCategories: (newCategory: Category[]) => void;

  reloadContext: boolean;
  setReloadContext: (reload: boolean) => void;

  reloadContextPostsVisited: boolean;
  setReloadContextPostsVisited: (reload: boolean) => void;

  listOfIdOfCategories: number[];
  setListOfIdOfCategories: (listOfIdOfCategories: number[]) => void;

  idsRecents: string[];
  setIdsRecents: (idsRecents: string[]) => void;

  postsRecents: Post[];
  setPostsRecents: (postsRecents: Post[]) => void;
}

interface PostProviderProps {
  children: ReactNode
}

export const PostesContext = createContext({} as PostContextType);


export function PostsProvider({ children }: PostProviderProps) {

  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategoriaProps[]>([])


  const [carregando, setCarregando] = useState(true);
  const [totalDePosts, setTotalDePosts] = useState<Post[]>([]);
  const [novosPostsComBusca, setNovosPostsComBusca] = useState([]);
  const [limitePaginacao, setlimitePaginacao] = useState(3);
  const [limiteApi, setLimiteApi] = useState(15);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginaAtualDaPaginacao, setPaginaAtualDaPaginacao] = useState(1);

  // String a ser pesquisada
  const [palavra, setPalavra] = useState(sessionStorage.getItem('palavra'));
  const [valorInput, setValorInput] = useState('');

  const [listOfCategories, setListOfCategories] = useState<Category[]>([]);

  const [listOfIdOfCategories, setListOfIdOfCategories] = useState<number[]>([]);

  const [idsRecents, setIdsRecents] = useState<string[]>([]);
  const [postsRecents, setPostsRecents] = useState<Post[]>([]);

  const [reloadContext, setReloadContext] = useState(false);
  const [reloadContextPostsVisited, setReloadContextPostsVisited] = useState(false);

  useEffect(() => {
    async function getAllCategories() {

      const allCategories = await api.getAllCategories();

      setListOfCategories(allCategories)
    }

    getAllCategories();

  }, [reloadContext]);

  /*   console.log("Categories: ", listOfCategories);
    console.log("idsRecents: ", idsRecents);
   */

  // Envia a palava para fazer a pesquisa
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (e !== '') {
      setPalavra(valorInput);
      sessionStorage.setItem('palavra', valorInput);
      window.location.reload();
    } else {
      sessionStorage.removeItem('palavra');
      setPalavra('');
    }
  };

  // Recebe as informações passadas pelo input
  const handleChange = (e: any) => {
    if (e !== '') {
      setValorInput(e);
    } else {
      sessionStorage.removeItem('palavra');
      setValorInput('');
      setPalavra('')
      setPaginaAtualDaPaginacao(1)
      setNovosPostsComBusca([]);
      window.location.reload();
    }
  };

  // Mostrando todas as postagens do banco de dado.
  useEffect(() => {
    const getTotalDePosts = async () => {

      if (palavra !== null) {
        const json = await api.getAllPosts({
          paginaAtual: paginaAtualDaPaginacao,
          limiteApi,
          palavra
        });

        if (json) {
          setNovosPostsComBusca(novosPostsComBusca.concat(json));
          const paginasComBusca = Math.ceil(novosPostsComBusca.concat(json).length / limitePaginacao);
          setTotalPaginas(paginasComBusca);
        }
      } else {
        const json = await api.getAllPosts({
          paginaAtual: paginaAtualDaPaginacao,
          limiteApi
        });

        if (json) {
          setTotalDePosts(totalDePosts.concat(json));
          const paginasSemBusca = Math.ceil(totalDePosts.concat(json).length / limitePaginacao);
          setTotalPaginas(paginasSemBusca);
        }
      }
      setCarregando(false);
    }
    getTotalDePosts();
  }, [palavra, paginaAtualDaPaginacao]);

  // Exibe Carregando enquanto os posts não são exibidas
  if (novosPostsComBusca) {
    if (carregando && novosPostsComBusca.length === 0) {
      return <h2>Carregando...</h2>
    }
  } else if (totalDePosts) {
    if (carregando && totalDePosts.length === 0) {
      return <h2>Carregando...</h2>
    }
  }

  // Paginação dos posts por Index
  const indexDoUltimoPost = paginaAtual * limitePaginacao;
  const indexDoPrimeiroPost = indexDoUltimoPost - limitePaginacao;

  let paginacaoDePostsComBusca;
  let paginacaoDePosts;

  if (novosPostsComBusca.length > 0) {
    paginacaoDePostsComBusca = novosPostsComBusca.slice(indexDoPrimeiroPost, indexDoUltimoPost)

  } else if (totalDePosts) {

    paginacaoDePosts = totalDePosts.slice(indexDoPrimeiroPost, indexDoUltimoPost)
  }

  return (
    <PostesContext.Provider
      value={{
        totalDePosts,
        totalPaginas,
        limitePaginacao,
        paginaAtual,
        setPaginaAtual,
        paginaAtualDaPaginacao,
        setPaginaAtualDaPaginacao,
        limiteApi,
        setLimiteApi,
        paginacaoDePosts,
        paginacaoDePostsComBusca,
        palavra,
        handleSubmit,
        handleChange,

        listOfCategories,
        setListOfCategories,
        reloadContext,
        setReloadContext,
        listOfIdOfCategories,
        setListOfIdOfCategories,
        idsRecents,
        setIdsRecents,
        postsRecents,
        setPostsRecents,
        reloadContextPostsVisited,
        setReloadContextPostsVisited,

      } as PostContextType}
    >
      {children}
    </PostesContext.Provider>
  )
}

