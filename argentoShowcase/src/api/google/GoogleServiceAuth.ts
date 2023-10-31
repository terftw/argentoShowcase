import { auth } from '@googleapis/oauth2';
import { OAuth2Client } from 'googleapis-common';

import { GoogleServiceAuthCredentials } from './GoogleServiceAuthenticator';

export class GoogleServiceAuth {
    private oauth2: OAuth2Client;

    constructor({ authCredentials, clientId, clientSecret }: { authCredentials: GoogleServiceAuthCredentials, clientId?: string, clientSecret?: string }) {
        this.oauth2 = this.buildOauth2({
            authCredentials,
            clientId: clientId ?? process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: clientSecret ?? process.env.GOOGLE_CLIENT_SECRET ?? ''
        });
    }

    get auth(): OAuth2Client {
        return this.oauth2;
    }

    private buildOauth2({ authCredentials, clientId, clientSecret }: { authCredentials: GoogleServiceAuthCredentials, clientId: string, clientSecret: string }) {
        const oauth2 = new auth.OAuth2(
            clientId,
            clientSecret
        );
        oauth2.setCredentials({
            access_token: authCredentials.accessToken,
            refresh_token: authCredentials.refreshToken,
            expiry_date: authCredentials.expiryDate
        });
        return oauth2;
    }
}