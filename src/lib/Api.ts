import qs from 'qs';
import { apiRequest } from './axios';
import { fazerLogin } from './authHandler';
import { AxiosRequestConfig } from 'axios';

interface Props {
  paginaAtual?: number,
  limiteApi?: number,
  palavra?: string,
  url?: string,
}

interface PropsPostItens {
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

interface PropsRelacaoLinks {
  id: string;
  id_relacao: string;
  lk_post: string;
  titulo: string;
}
interface PropsNewCategory {
  id_cat: string;
  descricao: string;
  id_pai: string;
}

interface PropsCreatePost {
  id_post: string;
  titulo: string;
  resumo: string;
  obs: string;
  data_publicacao: string;
  postitem: PropsPostItens[];
  cat: PropsNewCategory[] | string;
  relacao: PropsRelacaoLinks[];
}

interface DataNewCategoryProps {
  id_cat: string;
  descricao: string;
  id_pai: string;
}

const apiAxiosGet = async (endpoint: string, body?: any) => {
  try {
    const response = await apiRequest.get(`${endpoint}?${qs.stringify(body)}`);
    return response.data;

  } catch (error: any) {
    return error.message;
  }
}

const apiAxiosPost = async (endpoint: string, body: any) => {
  try {
    const response = await apiRequest.post(endpoint, body);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

const apiAxiosDelete = async (endpoint: string, body?: AxiosRequestConfig<any> | undefined) => {
  try {
    const response = await apiRequest.delete(endpoint, body);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

const apiAxiosUpdate = async (endpoint: string, body: any) => {
  try {
    const response = await apiRequest.put(endpoint, body);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

export const api = {

  getAllUsers: async (options: any) => {
    const response = await apiAxiosGet('/usuario', options);
    return response;
  },

  login: async (email: string, senha: string, rememberPassword: boolean) => {
    const response = await apiAxiosPost('/login', { email, senha });

    if (response.status === 'sucesso') {
      const token = response.usuario.token;
      fazerLogin(token, rememberPassword);
    }

    return response;
  },

  getAllPosts: async (options: Props) => {
    const response = await apiAxiosGet('/post', options);
    return response;
  },

  getAllCategories: async (options?: any) => {
    const response = await apiAxiosGet('/categoria', options);
    return response;
  },

  getNewCategories: async () => {
    const response = await apiAxiosGet('/categ');
    return response;
  },

  getAllSubCategories: async (idCat: string) => {
    const response = await apiAxiosGet(`/categoria/${idCat}`);
    return response;
  },

  getOnePostForId: async (id: string | undefined) => {
    const response = await apiAxiosGet(
      `/post/${id}`
    );
    return response;
  },

  createPost: async (
    {
      id_post,
      titulo,
      resumo,
      obs,
      data_publicacao,
      postitem,
      cat,
      relacao
    }: PropsCreatePost) => {

    const response = await apiAxiosPost('/post',
      {
        id_post,
        titulo,
        resumo,
        obs,
        data_publicacao,
        postitem,
        lk_categoria: cat,
        relacao,
      });
    return response;
  },

  createNewCategory: async (dataNewCategory: DataNewCategoryProps) => {
    const response = await apiAxiosPost('/categoria', dataNewCategory);
    return response;
  },

  deletePosts: async (id: string) => {
    const response = await apiAxiosDelete(`/post/${id}`);
    return response;
  },

  deletePostItem: async (iditem: any) => {
    const response = await apiAxiosDelete(`/postitem/${iditem}`)
    return response;
  },

  deleteLinkRelation: async (idLink: any) => {
    const response = await apiAxiosDelete(`/postrelacao/${idLink}`)
    return response;
  },

  deleteCategory: async (idCat: any) => {
    const response = await apiAxiosDelete(`/categoria/${idCat}`)
    return response;
  },

  updatePost: async (id_post: any, valores: any) => {
    const response = await apiAxiosUpdate(`/post/${id_post}`, valores);
    return response;
  },

  updateCategories: async (id_cat: string, valoresDaCategoria: any) => {
    const response = await apiAxiosUpdate(`/categoria/${id_cat}`, valoresDaCategoria);
    return response;
  },

  recoveryPassword: async (email: string) => {
    const response = await apiAxiosPost('/senha', { email })
    return response;
  },

  UpdatePassword: async (id: any, valores: any) => {
    const response = await apiAxiosUpdate(`/senha/${id}`, valores);
    return response;
  }
};

