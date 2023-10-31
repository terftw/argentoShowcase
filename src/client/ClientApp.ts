import { ApolloClient, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag';

import { FormSpec } from '@/common/formSpec';
import { Client, User } from '@/generated/graphql';

const apolloClient = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export class ClientApp {
    async createClient({ attributes }: { attributes: object }) {
        console.info('Adding client...', { attributes });
        const { data } = await apolloClient.mutate<{ createClient: string }>({
            mutation: gql`
                mutation($input: CreateClientInput!) {
                    createClient(input: $input)
                }
            `,
            variables: {
                input: { attributesJson: JSON.stringify(attributes) }
            }
        });

        const id = data?.createClient;
        console.info(`Created client of ID ${id}`);
    }

    async editClient(id: string, { attributes }: { attributes: object }) {
        console.info(`Editing client of ID ${id}...`, { attributes });
        await apolloClient.mutate({
            mutation: gql`
                mutation($input: EditClientInput!) {
                    editClient(input: $input)
                }
            `,
            variables: {
                input: { id, attributesJson: JSON.stringify(attributes) }
            }
        });
    }

    async deleteClient(id: string) {
        console.info(`Deleting client of ID ${id}...`);
        await apolloClient.mutate({
            mutation: gql`
                mutation($input: DeleteClientInput!) {
                    deleteClient(input: $input)
                }
            `,
            variables: {
                input: { id }
            }
        });
    }

    async getUser() {
        console.info('Getting user...');
        const { data } = await apolloClient.query<{ user: { user: User } }>({
            query: gql`
                query {
                    user {
                        user {
                            clientAttributesSpecJson
                            clientReportConfigDataJson
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only'
        });

        const { clientAttributesSpecJson, clientReportConfigDataJson } = data.user.user;
        return {
            clientAttributesSpec: JSON.parse(clientAttributesSpecJson) as FormSpec,
            clientReportConfigData: JSON.parse(clientReportConfigDataJson)
        };
    }

    async getClients({ ids }: { ids?: string[] }) {
        console.info('Getting clients...');
        const { data } = await apolloClient.query<{ clients: { clients: Client[] } }>({
            query: gql`
                query($input: ClientsInput) {
                    clients(input: $input) {
                        clients {
                            id
                            attributesJson
                        }
                    }
                }
            `,
            variables: { input: { ids } },
            fetchPolicy: 'network-only'
        });

        return data.clients.clients.map(x => ({
            id: x.id,
            attributes: JSON.parse(x.attributesJson)
        }))
    }

    async editUser(user: { clientAttributesSpec?: FormSpec, clientReportConfigData?: object }) {
        console.info('Editing user...', user);

        const { clientAttributesSpec, clientReportConfigData } = user;

        await apolloClient.mutate({
            mutation: gql`
                mutation($input: EditUserInput!) {
                    editUser(input: $input)
                }
            `,
            variables: {
                input: {
                    clientAttributesSpecJson: clientAttributesSpec ? JSON.stringify(clientAttributesSpec) : undefined,
                    clientReportConfigDataJson: clientReportConfigData ? JSON.stringify(clientReportConfigData) : undefined
                }
            }
        });
    }
}

