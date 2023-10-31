import React from "react";
import { Table as AntTable, Divider, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TitleProps } from "antd/es/typography/Title";
import EditConfiguration from "@/components/common/EditConfiguration";
import type { Props as EditConfigurationProps } from "@/components/common/EditConfiguration";
import { TableDataType } from "../constants";

type Props = {
  title: string;
  titleTypographyLevel?: TitleProps["level"];
  data: TableDataType[];
  columns: ColumnsType<TableDataType>;
  footerConfig?: EditConfigurationProps;
  isEditMode?: boolean;
};

const { Title } = Typography;

const Table = ({
  title,
  titleTypographyLevel,
  data,
  columns,
  footerConfig = { fieldEditPermissions: {} },
  isEditMode,
}: Props) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={titleTypographyLevel}>{title}</Title>
      <AntTable columns={columns} dataSource={data} pagination={false} />
      {isEditMode && <EditConfiguration {...footerConfig} />}
    </Space>
  );
};

export type { Props };
export default Table;
