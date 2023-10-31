import express, { Request, Response } from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { json } from 'body-parser';

import { server as apolloServer, getExpressMiddleware } from './apollo';
import { handle, app as nextApp } from './next';
import { handleGoogleAuthCode, handleAuth } from "./auth";
import { GOOGLE_AUTH_REDIRECT_PATH } from "./config";

async function buildApp(): Promise<express.Application> {
    await nextApp.prepare();
    await apolloServer.start();

    const app = express();
    app.use(cookieParser());

    app.get('/healthcheck', async (_: Request, res: Response) => {
        res.status(200).json({ status: 'healthy' });
    });
    app.use('/graphql', cors<cors.CorsRequest>(), json(), getExpressMiddleware(apolloServer));

    app.get(GOOGLE_AUTH_REDIRECT_PATH, handleGoogleAuthCode);
    app.all("*", async (req: Request, res: Response) => {
        await handleAuth(req, res);
        return handle(req, res);
    });

    return app;
}

export { buildApp };