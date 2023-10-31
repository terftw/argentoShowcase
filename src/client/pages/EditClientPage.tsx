"use client";

import React, { useContext } from "react";
import { Typography, Space } from "antd";

import DynamicForm from "@/client/dynamic/DynamicForm";
import { ClientContext } from "../ClientRoot";
import { usePageData } from "./page.utils";
import { assertArrayItems } from "@/common/assert.utils";

export default function EditClientPage({ id }: { id: string }) {
  const {
    app,
    routing,
    page: { trackLoading, showMessage },
  } = useContext(ClientContext);

  const { loader, data } = usePageData(async () => {
    const [clients, user] = await Promise.all([app.getClients({ ids: [id] }), app.getUser()]);
    const [client] = assertArrayItems(clients, 1);
    return { client, user };
  }, [id]);

  const onSubmit = trackLoading(async (value: object) => {
    await app.editClient(id, { attributes: value });
    showMessage("Successfully edited client", "success");
    await routing?.goToViewClients();
  });

  const client = data?.client;
  const formSpec = data?.user?.clientAttributesSpec;

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "32px",
      }}
    >
      <Typography.Title level={2}>Edit Client</Typography.Title>
      <Space
        direction="vertical"
        style={{ backgroundColor: "white", padding: "24px", width: "600px" }}
      >
        {formSpec && client ? (
          <DynamicForm
            formSpec={formSpec}
            formData={client.attributes}
            onSubmit={onSubmit}
          />
        ) : (
          loader
        )}
      </Space>
    </Space>
  );
}
