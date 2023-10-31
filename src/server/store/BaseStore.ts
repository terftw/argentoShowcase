export interface BaseStore {
    getClients(params: { ids?: string[] }): Promise<{ attributes: object }[]>;
    createClient(client: { attributes: object }): Promise<{ id: string }>;
    editClient(id: string, client: { attributes: object }): Promise<void>;
    deleteClient(id: string): Promise<void>;
}