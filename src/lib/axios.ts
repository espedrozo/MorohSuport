import axios from 'axios'
// import { getEnv, VariableOfAmbientProduction } from '../resources';


// Usar esse código caso tenha ambiente de Desenvolvimento e Bando de dados Local

/* export const apiRequest = axios.create({
  baseURL: getEnv(
    VariableOfAmbientProduction ? 'VITE_BASE_URL_API_PRODUCTION'
      : 'VITE_BASE_URL_API_DEVELOPMENT'
  ),
}); */

// Banco de dados em Produção (TOME MUITO CUIDADO)
export const apiRequest = axios.create({
  baseURL: "https://suporte.morohsoftware.com/MorohApiSuport/public"
});
