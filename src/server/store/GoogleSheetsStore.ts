import _mapValues from 'lodash/mapValues';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { v4 as generateUuid } from 'uuid';

import { GoogleService } from "@/api/google/GoogleService";
import { assertDefined } from "@/common/assert.utils";
import { flattenObject, unflattenObject } from "@/common/object.utils";
import { BaseStore } from "./BaseStore";
import { FormSpec } from "@/common/formSpec";
import { parseAsObjectType } from '@/common/parse.utils';

const SETTINGS_JSON_NAME = 'argento.settings.json';
const CLIENTS_CSV_NAME = 'argento.clients.csv';

interface CsvClient {
    id: string;
    attributes: object;
}

interface User {
    clientAttributesSpec?: FormSpec;
    clientReportConfigData?: object;
}

export class GoogleSheetsStore implements BaseStore {
    private googleService: GoogleService;

    constructor({ googleService }: { googleService: GoogleService }) {
        this.googleService = googleService;
    }

    async getClients({ ids }: { ids?: string[] }): Promise<CsvClient[]> {
        const csvString = await this.googleService.readFile({ name: CLIENTS_CSV_NAME }) ?? '';

        let clients = this.getClientsFromCsvString(csvString);
        if (ids) clients = clients.filter(x => ids.includes(x.id));

        return clients;
    }

    async createClient(client: { attributes: object; }): Promise<{ id: string }> {
        const id = generateUuid();
        const clients = await this.readClients();
        const createdClient = { ...client, id };
        const newClients = [...clients, createdClient];
        await this.writeClients(newClients);
        return createdClient;
    }

    async editClient(id: string, editedClient: { attributes: object; }) {
        const clients = await this.readClients();
        const newClients = clients.map(client => {
            return (client.id == id) ? { ...client, ...editedClient } : client;
        });
        await this.writeClients(newClients);
    }

    async deleteClient(id: string) {
        const clients = await this.readClients();
        const newClients = clients.filter(client => client.id != id);
        await this.writeClients(newClients);
    }

    async getUser(): Promise<User> {
        const jsonString = await this.googleService.readFile({ name: SETTINGS_JSON_NAME });
        const settings = jsonString ? JSON.parse(jsonString) : {};
        return parseAsObjectType<User>(settings, (x) => {
            const clientAttributesSpec = parseAsObjectType<FormSpec>(_get(x, 'clientAttributesSpec'));
            const clientReportConfigData = parseAsObjectType(_get(x, 'clientReportConfigData'));
            return { clientAttributesSpec, clientReportConfigData };
        }) ?? {};
    }

    async editUser(user: User) {
        const oldUser = await this.getUser();
        const newUser = { ...oldUser, ...user };
        await this.googleService.writeFile({ name: SETTINGS_JSON_NAME, body: JSON.stringify(newUser), type: 'JSON' });
    }

    private async writeClients(clients: CsvClient[]) {
        const newCsvString = this.buildCsvStringFromClients(clients);
        await this.googleService.writeFile({ name: CLIENTS_CSV_NAME, body: newCsvString, type: 'CSV' });
    }

    private async readClients(): Promise<CsvClient[]> {
        const csvString = await this.googleService.readFile({ name: CLIENTS_CSV_NAME }) ?? '';
        const clients = this.getClientsFromCsvString(csvString);
        return clients;
    }

    private getClientsFromCsvString(csvString: string): CsvClient[] {
        const stringifiedFlatAttributesList = parse(csvString, { columns: true }) as object[];
        const flatAttributesList = stringifiedFlatAttributesList.map(x => _mapValues(x, y => this.parseCsvValue(y)));
        const attributesList = flatAttributesList.map(x => unflattenObject(x));
        return attributesList.map(attributes => {
            const id = assertDefined(attributes['$id']);
            const newAttributes = _omit(attributes, '$id');
            return {
                id,
                attributes: newAttributes
            };
        });
    }

    private buildCsvStringFromClients(clients: CsvClient[]) {
        const attributesList = clients.map(client => {
            return {
                ...client.attributes,
                ['$id']: client.id
            };
        });
        const flatAttributesList = attributesList.map(x => flattenObject(x));

        const columns: string[] = [];
        for (const attr of flatAttributesList) {
            for (const key in attr) {
                if (!columns.includes(key)) columns.push(key);
            }
        }

        const stringifiedFlatAttributesList = flatAttributesList.map(x => _mapValues(x, y => this.stringifyCsvValue(y)));
        return stringify(stringifiedFlatAttributesList, { header: true, columns });
    }

    private stringifyCsvValue(value: unknown): any {
        if (Array.isArray(value)) {
            return `json:${JSON.stringify(value)}`;
        }
        return value;
    }

    private parseCsvValue(value: unknown): any {
        if (typeof value == 'string' && value.startsWith('json:')) {
            return JSON.parse(value.slice('json:'.length));
        }
        return value;
    }
}