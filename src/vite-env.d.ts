/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TOWNS_API_URL: string;
    readonly VITE_METEO_CONCEPT_API_URL: string;
    readonly VITE_METEO_CONCEPT_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
