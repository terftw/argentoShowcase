import { assertDefined } from '@/common/assert.utils';
import { auth } from '@googleapis/oauth2';
import { OAuth2Client } from 'googleapis-common';

const DEFAULT_SCOPE = [
    "https://www.googleapis.com/auth/drive.file"
];

export interface GoogleServiceAuthCredentials {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

export class GoogleServiceAuthenticator {
    private oauth2: OAuth2Client;

    constructor({ redirectUri, clientId, clientSecret }: { redirectUri: string, clientId?: string, clientSecret?: string }) {
        this.oauth2 = this.buildOauth2({
            redirectUri,
            clientId: clientId ?? process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: clientSecret ?? process.env.GOOGLE_CLIENT_SECRET ?? ''
        });
    }

    async getAuthUrl({ scope }: { scope?: string[] } = {}): Promise<string> {
        return this.oauth2.generateAuthUrl({
            scope: scope ?? DEFAULT_SCOPE,
            access_type: 'offline',
            prompt: 'consent'
        });
    }

    async getAuthCredentials({ authCode }: { authCode: string }): Promise<GoogleServiceAuthCredentials> {
        const { tokens } = await this.oauth2.getToken(authCode);
        console.debug('OAuth credentials received:', tokens);
        return this.toAuthCredentials(tokens);
    }

    async refreshAuthCredentials(authCredentials: GoogleServiceAuthCredentials) {
        this.oauth2.setCredentials({
            refresh_token: authCredentials.refreshToken
        });
        const { credentials } = await this.oauth2.refreshAccessToken();
        console.debug('Refreshed OAuth credentials received:', credentials);
        return this.toAuthCredentials(credentials);
    }

    private toAuthCredentials(
        { access_token, refresh_token, expiry_date }:
            { access_token?: string | null, refresh_token?: string | null, expiry_date?: number | null }
    ) {
        const accessToken = assertDefined(access_token);
        const refreshToken = assertDefined(refresh_token);
        const expiryDate = assertDefined(expiry_date);
        return { accessToken, refreshToken, expiryDate };
    }

    private buildOauth2({ clientId, clientSecret, redirectUri }: { clientId: string, clientSecret: string, redirectUri: string }) {
        return new auth.OAuth2(
            clientId,
            clientSecret,
            redirectUri
        );
    }
}

