/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly VITE_API_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
