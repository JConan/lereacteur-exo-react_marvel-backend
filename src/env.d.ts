declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      MARVEL_API_BASEPATH: string;
      MARVEL_API_KEY: string;
    }
  }
}

export {};
