import { api } from '../lib/Api';
import { createContext } from 'use-context-selector';
import { ReactNode, useEffect, useState } from 'react';

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

interface PostContextType {

  userName: string;
  limiteApi: number;
  paginaAtual: number;
  totalPaginas: number;
  palavra: string | null;
  reloadContext: boolean;
  limitePaginacao: number;
  paginaAtualDaPaginacao: number;
  reloadContextPostsVisited: boolean;

  posts: Post[];
  idsRecents: string[];
  totalDePosts: Post[];
  postsRecents: Post[];
  categories: Category[];
  listOfCategories: Category[];
  listOfIdOfCategories: number[];
  paginacaoDePosts: Post[] | undefined;
  paginacaoDePostsComBusca: Post[] | undefined;

  setLimiteApi: (item: number) => void;
  setPaginaAtual: (item: number) => void;
  handleSubmit: (e: any) => Promise<void>;
  handleChangeSearcWord: (e: any) => void;
  setReloadContext: (reload: boolean) => void;
  setIdsRecents: (idsRecents: string[]) => void;
  setPostsRecents: (postsRecents: Post[]) => void;
  setPaginaAtualDaPaginacao: (item: number) => void;
  setListOfCategories: (newCategory: Category[]) => void;
  setReloadContextPostsVisited: (reload: boolean) => void;
  setListOfIdOfCategories: (listOfIdOfCategories: number[]) => void;
}

interface PostProviderProps {
  children: ReactNode
}

export const PostesContext = createContext({} as PostContextType);

export function PostsProvider({ children }: PostProviderProps) {

  var palavraLocalStorage = localStorage.getItem('@moroh-suport-v1.0.1:palavra');

  const limitePaginacao = 3;
  const [userName, setUserName] = useState('');
  const [limiteApi, setLimiteApi] = useState(15);
  const [valorInput, setValorInput] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [reloadContext, setReloadContext] = useState(false);
  const [idsRecents, setIdsRecents] = useState<string[]>([]);
  const [postsRecents, setPostsRecents] = useState<Post[]>([]);
  const [totalDePosts, setTotalDePosts] = useState<Post[]>([]);
  const [paginaAtualDaPaginacao, setPaginaAtualDaPaginacao] = useState(1);
  const [novosPostsComBusca, setNovosPostsComBusca] = useState<Post[]>([]);
  const [listOfCategories, setListOfCategories] = useState<Category[]>([]);
  const [listOfIdOfCategories, setListOfIdOfCategories] = useState<number[]>([]);
  const [reloadContextPostsVisited, setReloadContextPostsVisited] = useState(false);
  const [palavra, setPalavra] = useState(palavraLocalStorage !== null ? palavraLocalStorage : "");

  useEffect(() => {
    async function getAllCategories() {
      const allCategories = await api.getAllCategories();
      setListOfCategories(allCategories)
    }
    getAllCategories();
  }, [reloadContext]);

  useEffect(() => {
    var userNameLocalStorage = localStorage.getItem('@moroh-suport-v1.0.1:userName');

    setUserName(userNameLocalStorage !== null ? userNameLocalStorage : "")

  }, [userName]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (event !== '') {
      setPalavra(valorInput);
      localStorage.setItem('@moroh-suport-v1.0.1:palavra', valorInput);

      window.location.reload();
    } else {
      localStorage.removeItem('@moroh-suport-v1.0.1:palavra');
      setPalavra('');
    }
  };

  const handleChangeSearcWord = (e: any) => {
    if (e !== '') {
      setValorInput(e);
    } else {
      localStorage.removeItem('@moroh-suport-v1.0.1:palavra');
      setValorInput('');
      setPalavra('')
      setPaginaAtualDaPaginacao(1)
      setNovosPostsComBusca([]);
    }
  };

  useEffect(() => {
    const getTotalDePosts = async () => {

      if (palavra.trim() !== "") {
        const response = await api.getAllPosts({
          paginaAtual: paginaAtualDaPaginacao,
          limiteApi,
          palavra
        });

        if (response) {
          setNovosPostsComBusca(novosPostsComBusca.concat(response));
          const paginasComBusca = Math.ceil(novosPostsComBusca.concat(response).length / limitePaginacao);
          setTotalPaginas(paginasComBusca);
        }
      } else {
        const response = await api.getAllPosts({
          paginaAtual: paginaAtualDaPaginacao,
          limiteApi
        });

        if (response) {
          setTotalDePosts(totalDePosts.concat(response));
          const paginasSemBusca = Math.ceil(totalDePosts.concat(response).length / limitePaginacao);
          setTotalPaginas(paginasSemBusca);
        }
      }
    }
    getTotalDePosts();
  }, [palavra, paginaAtualDaPaginacao]);

  // Paginação dos posts por Index
  const indexDoUltimoPost = paginaAtual * limitePaginacao;
  const indexDoPrimeiroPost = indexDoUltimoPost - limitePaginacao;

  let paginacaoDePosts;
  let paginacaoDePostsComBusca;

  if (novosPostsComBusca.length > 0) {
    paginacaoDePostsComBusca = novosPostsComBusca.slice(indexDoPrimeiroPost, indexDoUltimoPost);
  } else if (totalDePosts) {
    paginacaoDePosts = totalDePosts.slice(indexDoPrimeiroPost, indexDoUltimoPost);
  }

  return (
    <PostesContext.Provider
      value={{
        palavra,
        userName,
        limiteApi,
        idsRecents,
        paginaAtual,
        handleSubmit,
        totalDePosts,
        totalPaginas,
        postsRecents,
        reloadContext,
        limitePaginacao,
        listOfCategories,
        paginacaoDePosts,
        listOfIdOfCategories,
        handleChangeSearcWord,
        paginaAtualDaPaginacao,
        paginacaoDePostsComBusca,
        reloadContextPostsVisited,

        setLimiteApi,
        setIdsRecents,
        setPaginaAtual,
        setPostsRecents,
        setReloadContext,
        setListOfCategories,
        setListOfIdOfCategories,
        setPaginaAtualDaPaginacao,
        setReloadContextPostsVisited,
      } as PostContextType}
    >
      {children}
    </PostesContext.Provider>
  )
}

