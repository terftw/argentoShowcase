"use client";

import { Button, Typography, Space, Modal } from "antd";
import React, { useContext, useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import _get from 'lodash/get';

import type { Props as ClientDetailsModalProps } from "@/components/client/ClientDetailsModal";
import ClientDetailsModal from "@/components/client/ClientDetailsModal";
import DynamicTable from "@/client/dynamic/DynamicTable";
import { ClientContext } from "../ClientRoot";
import { usePageData } from "./page.utils";
import { KNOWN_FIELD } from "@/data/clientAttributes.spec.default";

type Client = NonNullable<ClientDetailsModalProps["client"]>;

export default function ClientsPage() {
  const { app, routing, page: { trackLoading, showMessage } } = useContext(ClientContext);

  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [openClientDetails, setOpenClientDetails] = useState(false);

  const { loader, data: clients } = usePageData(async () => {
    return app.getClients({});
  });

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={2}>Clients</Typography.Title>
      {clients ? (
        <Space direction="vertical" size={32} style={{ width: "100%" }}>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            style={{ float: "right" }}
            onClick={() => routing?.goToAddClientPage()}
          >
            Add Client
          </Button>
          <DynamicTable
            objects={clients}
            columnsSpec={[
              { name: "Name", getValue: (x) => getField(x, KNOWN_FIELD.NAME) },
              { name: "Email", getValue: (x) => getField(x, KNOWN_FIELD.EMAIL) },
              { name: "Mobile number", getValue: (x) => getField(x, KNOWN_FIELD.MOBILE_NO) },
            ]}
            actions={[
              {
                name: "View",
                onClick: async (obj) => {
                  const client = obj as Client;
                  setOpenClientDetails(true);
                  setSelectedClient(client);
                },
              },
              {
                name: "Edit",
                onClick: async (obj) => {
                  const client = obj as Client;
                  if (client) await routing?.goToEditClient({ id: client.id });
                },
              },
              {
                name: "Check generated report",
                onClick: async (obj) => {
                  const client = obj as Client;
                  if (client) await routing?.goToViewClientReport({ id: client.id });
                },
              },
              {
                name: "Delete",
                onClick: async (obj) => {
                  const client = obj as Client;
                  const name = getField(client, KNOWN_FIELD.NAME);
                  if (client) {
                    Modal.warning({
                      title: "Confirm Delete",
                      content: `Are you sure you want to delete "${name}?"`,
                      okText: "Delete",
                      okButtonProps: {
                        danger: true
                      },
                      cancelText: "Cancel",
                      onOk: trackLoading(async () => {
                        await app.deleteClient(client.id);
                        showMessage("Successfully deleted client", "success");
                      }),
                      okCancel: true,
                      maskClosable: true,
                      onCancel: () => null
                    });
                  }
                },
              },
            ]}
          />
        </Space>
      ) : (
        loader
      )}
      <ClientDetailsModal
        client={selectedClient}
        open={openClientDetails}
        setOpen={setOpenClientDetails}
      />
    </div>
  );
}

function getField(client: object, fieldPath: string[]) {
  return _get(client, ["attributes", ...fieldPath]);
}