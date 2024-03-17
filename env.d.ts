// env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
        AUTH_SECRET: string;
        MONGODB_URI: string;
        DOMAIN: string;
    }
}
