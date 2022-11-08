import axios from 'axios'
import { getEnv, VariableOfAmbientProduction } from '../resources';

export const apiRequest = axios.create({
  baseURL: getEnv(
    VariableOfAmbientProduction ? 'VITE_BASE_URL_API_PRODUCTION'
      : 'VITE_BASE_URL_API_DEVELOPMENT'
  ),
});