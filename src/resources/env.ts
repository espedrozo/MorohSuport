const env = {
  VITE_BASE_URL_API_PRODUCTION: import.meta.env.VITE_BASE_URL_API_PRODUCTION,
  VITE_BASE_URL_API_DEVELOPMENT: import.meta.env.VITE_BASE_URL_API_DEVELOPMENT,
}

export const getEnv = (envVariable: keyof typeof env) => {
  const internalEnvVariable = env[envVariable]
  return internalEnvVariable;
}

export const VariableOfAmbientProduction = import.meta.env.VITE_BASE_URL_API_PRODUCTION;
