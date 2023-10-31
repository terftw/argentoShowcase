"use client";

import React, { useContext } from "react";
import { Typography, Space } from "antd";

import DynamicForm from "@/client/dynamic/DynamicForm";
import { ClientContext } from "../ClientRoot";
import { usePageData } from "./page.utils";

export default function AddClientPage() {
  const {
    app,
    routing,
    page: { trackLoading, showMessage },
  } = useContext(ClientContext);

  const { loader, data: user } = usePageData(async () => {
    return app.getUser();
  });

  const onSubmit = trackLoading(async (value: object) => {
    await app.createClient({ attributes: value });
    showMessage("Successfully added client", "success");
    await routing?.goToViewClients();
  });

  const formSpec = user?.clientAttributesSpec;

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "32px",
      }}
    >
      <Typography.Title level={2}>Add Client</Typography.Title>
      <Space
        direction="vertical"
        style={{ backgroundColor: "white", padding: "24px", width: "600px" }}
      >
        {formSpec ? (
          <DynamicForm formSpec={formSpec} onSubmit={onSubmit} />
        ) : (
          loader
        )}
      </Space>
    </Space>
  );
}
