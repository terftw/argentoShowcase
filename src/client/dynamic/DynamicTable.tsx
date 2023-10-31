"use client";

import React from "react";
import { Button, Space, Table } from "antd";
import styled from "@emotion/styled";
import { ColumnType } from "antd/es/table";

type ColumnSpec = {
  getValue: (obj: object) => any;
  name: string;
};

type ObjectAction = {
  name: string;
  onClick: (obj: object) => Promise<void>;
};

const StyledTable = styled(Table)`
  .ant-table
    .ant-table-container
    .ant-table-content
    table
    thead.ant-table-thead
    .ant-table-cell {
    background-color: white;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: none !important;
  }
`;

export default function DynamicTable({
  objects,
  columnsSpec,
  actions,
}: {
  objects: object[];
  columnsSpec: ColumnSpec[];
  actions: ObjectAction[];
}) {
  const columns = toColumns({ columnsSpec, actions });
  return (
    <>
      <StyledTable dataSource={objects} columns={columns} />
    </>
  );
}

function toColumns({
  columnsSpec,
  actions,
}: {
  columnsSpec: ColumnSpec[];
  actions: ObjectAction[];
}): ColumnType<any>[] {
  const dataColumns = columnsSpec.map((x) => ({
    key: x.name,
    title: x.name,
    render: (_: unknown, record: object) => {
      return x.getValue(record);
    }
  }));

  const actionColumn =
    actions.length > 0
      ? {
        title: "Actions",
        dataIndex: `action`,
        width: 400,
        render: (_: any, obj: object) => {
          return (
            <Space size="middle">
              {actions.map((action) => {
                return (
                  <Button
                    type="link"
                    key={action.name}
                    onClick={() => action.onClick(obj)}
                    style={{ padding: 0 }}
                  >
                    {action.name}
                  </Button>
                );
              })}
            </Space>
          );
        },
      }
      : null;

  return [...dataColumns, ...(actionColumn ? [actionColumn] : [])];
}
