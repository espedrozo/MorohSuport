const env = {
  VITE_BASE_URL_API_PRODUCTION: import.meta.env.VITE_BASE_URL_API_PRODUCTION,
  VITE_BASE_URL_API_DEVELOPMENT: import.meta.env.VITE_BASE_URL_API_DEVELOPMENT,
}

export const getEnv = (envVariable: keyof typeof env) => {
  const internalEnvVariable = env[envVariable]
  /*   if (typeof internalEnvVariable === 'undefined') {
      throw new Error(`Você deve definir ${envVariable} variável de ambiente antes de usá-la!`)
    }
   */
  return internalEnvVariable;
}

//export const VariableOfAmbientProduction = import.meta.env.VITE_BASE_URL_API_PRODUCTION;
//export const VariableOfAmbienDevelopment = import.meta.env.VITE_BASE_URL_API_DEVELOPMENT;