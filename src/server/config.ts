export const DEV = process.env.NODE_ENV !== "production";
export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || `localhost:${PORT}`
export const GOOGLE_AUTH_REDIRECT_PATH = `/google-auth`;
export const AUTH_TOKEN_SECRET = '9oLD57yW0WWfu4ZtEmybBrx1JfkO4TzDpD2zXlp2Ue3UJplifQRap+MbE0PxRlVWtR4KWsIRamhn7J44DkwoyA==';