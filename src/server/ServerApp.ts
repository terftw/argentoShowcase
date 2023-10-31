import { GoogleService } from "@/api/google/GoogleService";
import { GoogleServiceAuth } from "@/api/google/GoogleServiceAuth";
import { GoogleServiceAuthCredentials } from "@/api/google/GoogleServiceAuthenticator";
import { assertDefined } from "@/common/assert.utils";
import { FormSpec } from "@/common/formSpec";
import DEFAULT_FORM_SPEC from '@/data/clientAttributes.spec.default';
import { cookies } from "next/headers";
import { readAuthCredentialsFromCookie } from "./auth";
import { GoogleSheetsStore } from "./store/GoogleSheetsStore";

export interface ServerAppContext {
    authCredentials?: GoogleServiceAuthCredentials;
}

export default class ServerApp {
    private store?: GoogleSheetsStore;

    static async getContextFromRequest({ getCookie }: {
        getCookie: (name: string) => string | null
    }): Promise<ServerAppContext> {
        return {
            authCredentials: await readAuthCredentialsFromCookie({ getCookie }) ?? undefined
        };
    }

    constructor({ authCredentials }: ServerAppContext) {
        const auth = authCredentials ? new GoogleServiceAuth({ authCredentials }) : undefined;
        const googleService = auth ? new GoogleService({ auth }) : undefined;
        this.store = googleService ? new GoogleSheetsStore({ googleService }) : undefined;
    }

    async getClients({ ids }: { ids?: string[] }) {
        const store = assertDefined(this.store);
        const clients = await store.getClients({ ids });
        return clients;
    }

    async getUser() {
        const store = assertDefined(this.store);
        const user = await store.getUser();

        return {
            clientAttributesSpec: user.clientAttributesSpec ?? DEFAULT_FORM_SPEC,
            clientReportConfigData: user.clientReportConfigData ?? {}
        };
    }

    async createClient({ attributes }: { attributes: object }): Promise<{ id: string }> {
        const store = assertDefined(this.store);
        return store.createClient({ attributes });
    }

    async editClient(id: string, { attributes }: { attributes: object }) {
        const store = assertDefined(this.store);
        await store.editClient(id, { attributes });
    }

    async deleteClient(id: string) {
        const store = assertDefined(this.store);
        await store.deleteClient(id);
    }

    async editUser(user: { clientAttributesSpec?: FormSpec, clientReportConfigData?: object }) {
        const store = assertDefined(this.store);
        await store.editUser(user);
    }
}

export async function getServerApp(): Promise<ServerApp> {
    const serverAppContext = await ServerApp.getContextFromRequest({
        getCookie: (name) => cookies().get(name)?.value ?? null
    });
    return new ServerApp(serverAppContext);
}