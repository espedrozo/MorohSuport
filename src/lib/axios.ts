import axios from 'axios'
import { getEnv } from '../resources';

//const VITE_BASE_URL_API_PRODUCTION = getEnv("VITE_BASE_URL_API_PRODUCTION");
//const VITE_BASE_URL_API_DEVELOPMENT = getEnv("VITE_BASE_URL_API_DEVELOPMENT");
//Está funcionando nesse Subdomínio
//const baseURL = 'https://suporte.morohsoftware.com/AppApi/public/api';

//console.log("VARIAVEL DE PRODUÇÃO: ", VITE_BASE_URL_API_PRODUCTION);
//console.log("VARIAVEL DE DESENVOLVIMENTO: ", VITE_BASE_URL_API_DEVELOPMENT);


export const apiRequest = axios.create({
  //baseURL: getEnv("VITE_BASE_URL_API_DEVELOPMENT"),
  baseURL: getEnv("VITE_BASE_URL_API_PRODUCTION"),
  //baseURL: VITE_BASE_URL_API_PRODUCTION,
});