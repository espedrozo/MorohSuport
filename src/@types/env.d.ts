// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_API_PRODUCTION?: string
  readonly VITE_BASE_URL_API_DEVELOPMENT?: string
  // more env varibles
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}