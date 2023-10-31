import { Request, Response } from "express";
import _get from 'lodash/get';
import { SignJWT, jwtVerify, JWTPayload } from 'jose'

import { HOST, GOOGLE_AUTH_REDIRECT_PATH, AUTH_TOKEN_SECRET } from "./config";
import { GoogleServiceAuthCredentials, GoogleServiceAuthenticator } from "@/api/google/GoogleServiceAuthenticator";
import { getCookie, getQueryParam } from "./request.utils";
import { assertNumber, assertString } from "@/common/assert.utils";
import { parseAsObjectType } from "@/common/parse.utils";
import { fail } from "assert";

const AUTH_TOKEN_COOKIE = 'AUTH_TOKEN';
const GOOGLE_AUTH_REDIRECT_URI = HOST.startsWith('localhost') ? `http://${HOST}${GOOGLE_AUTH_REDIRECT_PATH}` : `https://${HOST}${GOOGLE_AUTH_REDIRECT_PATH}`;
const JWT_SECRET = new TextEncoder().encode(AUTH_TOKEN_SECRET);

export async function handleGoogleAuthCode(req: Request, res: Response) {
    const authCode = getQueryParam(req, 'code');
    if (authCode) {
        const authenticator = new GoogleServiceAuthenticator({ redirectUri: GOOGLE_AUTH_REDIRECT_URI });
        const authCredentials = await authenticator.getAuthCredentials({ authCode });
        await setAuthCooke(res, authCredentials);
        res.redirect('/');
    }
}

export async function handleAuth(req: Request, res: Response) {
    const authToken = getCookie(req, AUTH_TOKEN_COOKIE);
    const authenticator = new GoogleServiceAuthenticator({ redirectUri: GOOGLE_AUTH_REDIRECT_URI });
    if (authToken) {
        const authCredentials = await fromAuthToken(authToken);
        if (Date.now() >= authCredentials.expiryDate) {
            console.log('Auth credentials expired:', authCredentials.expiryDate);
            const refreshedAuthCredentials = await authenticator.refreshAuthCredentials(authCredentials);
            await setAuthCooke(res, refreshedAuthCredentials);
            res.redirect(req.originalUrl);
        }
    } else {
        const authUrl = await authenticator.getAuthUrl();
        res.redirect(authUrl);
    }
}

export async function readAuthCredentialsFromCookie({ getCookie }: { getCookie: (name: string) => string | null }): Promise<GoogleServiceAuthCredentials | null> {
    const authToken = getCookie(AUTH_TOKEN_COOKIE);
    if (!authToken) return null;
    const authCredentials = await fromAuthToken(authToken);
    return authCredentials;
}

async function setAuthCooke(res: Response, authCredentials: GoogleServiceAuthCredentials) {
    const authToken = await toAuthToken(authCredentials);
    res.cookie(AUTH_TOKEN_COOKIE, authToken);
}

async function toAuthToken(authCredentials: GoogleServiceAuthCredentials): Promise<string> {
    return new SignJWT(authCredentials as any)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(JWT_SECRET);
}

async function fromAuthToken(authToken: string): Promise<GoogleServiceAuthCredentials> {
    const rawAuthCredentials = await jwtVerify(authToken, JWT_SECRET);
    return parseAsObjectType<GoogleServiceAuthCredentials, JWTPayload>(rawAuthCredentials.payload, (x) => {
        assertString(_get(x, 'accessToken'));
        assertString(_get(x, 'refreshToken'));
        assertNumber(_get(x, 'expiryDate'));
        return x;
    }) ?? fail('Expected raw auth credentials to be object');
}