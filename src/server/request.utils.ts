import { Request } from "express";

export function getCookie(req: Request, name: string): string | null {
    const cookie = req.cookies[name];
    if (typeof cookie === 'string') {
        return cookie;
    }
    return null;
}

export function getQueryParam(req: Request, param: string): string | null {
    const queryParam = req.query[param];
    if (Array.isArray(queryParam) && typeof queryParam[0] === 'string') {
        return queryParam[0];
    } else if (typeof queryParam === 'string') {
        return queryParam;
    }
    return null;
}