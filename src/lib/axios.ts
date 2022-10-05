import axios from 'axios'

//Está funcionando nesse Subdomínio
//const baseURL = 'https://suporte.morohsoftware.com/AppApi/public/api';

export const apiRequest = axios.create({
  baseURL: "http://localhost/AppApi/public/api"
});