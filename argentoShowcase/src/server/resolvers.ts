import { Resolvers } from "@/generated/graphql";
import { ApolloContext } from "./apollo";
import ServerApp from "./ServerApp";

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    clients: async (_, { input }, { serverAppContext }) => {
      const serverApp = new ServerApp(serverAppContext);

      const ids = input?.ids ?? undefined;

      const clients = await serverApp.getClients({ ids });

      return {
        clients: clients.map((x) => ({
          id: x.id,
          attributesJson: JSON.stringify(x.attributes),
        })),
      };
    },
    user: async (_, __, { serverAppContext }) => {
      const serverApp = new ServerApp(serverAppContext);
      const user = await serverApp.getUser();

      return {
        user: {
          ...user,
          clientAttributesSpecJson: JSON.stringify(user.clientAttributesSpec),
          clientReportConfigDataJson: JSON.stringify(user.clientReportConfigData)
        },
      };
    },
  },
  Mutation: {
    createClient: async (
      _,
      { input: { attributesJson } },
      { serverAppContext }
    ) => {
      const serverApp = new ServerApp(serverAppContext);
      const attributes = JSON.parse(attributesJson);

      const { id } = await serverApp.createClient({ attributes });

      return id;
    },
    editClient: async (
      _,
      { input: { id, attributesJson } },
      { serverAppContext }
    ) => {
      const serverApp = new ServerApp(serverAppContext);
      const attributes = JSON.parse(attributesJson);

      await serverApp.editClient(id, { attributes });

      return id;
    },
    deleteClient: async (_, { input: { id } }, { serverAppContext }) => {
      const serverApp = new ServerApp(serverAppContext);

      await serverApp.deleteClient(id);

      return id;
    },
    editUser: async (
      _,
      { input: { clientAttributesSpecJson, clientReportConfigDataJson } },
      { serverAppContext }
    ) => {
      const serverApp = new ServerApp(serverAppContext);

      await serverApp.editUser({
        clientAttributesSpec: clientAttributesSpecJson ? JSON.parse(clientAttributesSpecJson) : undefined,
        clientReportConfigData: clientReportConfigDataJson ? JSON.parse(clientReportConfigDataJson) : undefined,
      });

      return true;
    },
  },
};
