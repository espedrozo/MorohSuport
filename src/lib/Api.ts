import qs from 'qs';
import Cookies from 'js-cookie';

import { apiAxios } from './axios'
import { fazerLogin } from './authHandler';

interface Props {
  paginaAtual: number,
  limiteApi: number,
  palavra?: string,
  url?: string,
}


// Fazer a requisição via GET, recebe 2 requisiçõs (endpoint, corpo da requisição)
const apiFetchGet = async (endpoint: string, body = [] as any) => {
  try {
    const response = await apiAxios(`${endpoint}?${qs.stringify(body)}`);
    return response.data;

  } catch (error: any) {
    return error.message;
  }
}

// Fazer a requisição via post, recebe 2 requisiçõs (endpoint, corpo da requisição)
const apiFetchPost = async (endpoint: string, body = [] as any) => {

  //Mandando o token automatico
  /*  if (!body.token) {
              let token = Cookies.get('token');
          if (token) {
              body.token = token;
          }
      } 
  */

  try {
    const response = await apiAxios(endpoint, body);

    return response.data;

  } catch (error: any) {
    return error.message;
  }
}


export const api = {

  login: async (email: string, senha: string, rememberPassword: boolean) => {

    const response = await apiAxios.post('usuario', {
      email,
      senha
    });

    /*   if (!response.data.token) {
        let token = Cookies.get('@token:morohsuporte:1.0.0');
        if (token) {
          response.data.token = token;
        }
      } */

    const token = 'algumtokenqualquer';

    fazerLogin(token, rememberPassword);

    return response.data;
  },

  /*   getAllPosts: async (options: Props) => {
      const response = await apiFetchGet(
        '/post',
        options
      );
  
      console.log("all posts: ", options);
      console.log("all posts: ", response);
      return response;
    }, */

  getAllPosts: async (options: Props) => {

    const { paginaAtual, limiteApi } = options;

    const response = await apiAxios.get(
      '/post', {
      params: {
        paginaAtual,
        limiteApi
      }
    }
    );
    return response.data;
  },

  getAllCategories: async () => {
    const response = await apiAxios.get(
      '/categoria'
    );
    return response.data;
  },

  getAllSubCategories: async (idCat: string) => {
    const response = await apiAxios.get(
      `/categoria/${idCat}`
    );
    return response.data;
  },

  getOnePostForId: async (id: string | undefined) => {
    const response = await apiAxios.get(
      `/post/${id}`
    );
    return response.data;
  },
};
function token(token: any, rememberPassword: boolean) {
  throw new Error('Function not implemented.');
}

