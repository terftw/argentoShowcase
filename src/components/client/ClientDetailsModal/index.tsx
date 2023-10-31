import React from "react";
import { Descriptions, Modal, Space, Tag } from "antd";
import {
  ClientAttributes,
  DescriptionItemLabels,
  InsurancePolicy,
} from "@/common/client.d";
import {
  parseFormValues,
  parseWorkingTowardsMarriageValue,
} from "@/common/client.utils";
import Table, { ColumnsType } from "antd/es/table";

type Props = {
  client?: { id: string; attributes: ClientAttributes };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const columns: ColumnsType<InsurancePolicy> = [
  {
    title: "Policy Name",
    dataIndex: "policy_name",
    key: "policy_name",
  },
  {
    title: "Policy Type",
    dataIndex: "policy_type",
    key: "policy_type",
    render: (_, { policy_type }) => (
      <>
        {policy_type.map((type) => {
          return <Tag key={type}>{parseFormValues(type)}</Tag>;
        })}
      </>
    ),
  },
  {
    title: "Annual Premium",
    dataIndex: "annual_premium",
    key: "annual_premium",
  },
  {
    title: "Sum Assured",
    dataIndex: "sum_assured",
    key: "sum_assured",
  },
];

const ClientDetailsModal = ({
  client,
  open,
  setOpen,
}: Props): React.ReactElement => {
  const handleCancel = () => {
    setOpen(false);
  };

  const {
    family,
    insurance,
    personal_info,
    employment,
    assets,
    liabilities,
    expenses,
    financial_goals,
  } = client?.attributes ?? {};

  return (
    <Modal
      open={open}
      maskClosable={false}
      title={"Client Information"}
      onCancel={handleCancel}
      width={"80vw"}
      footer={[]}
      bodyStyle={{ height: "70vh", overflow: "auto", paddingRight: 24 }}
    >
      <Space
        direction="vertical"
        style={{ paddingTop: 24, width: "100%" }}
        size={40}
      >
        <Descriptions title="Personal Information" bordered layout="vertical">
          {personal_info &&
            Object.entries(personal_info).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <Descriptions title="Employment" bordered layout="vertical">
          {employment &&
            Object.entries(employment).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <Descriptions title="Family" bordered layout="vertical">
          {family &&
            Object.entries(family).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {key === "is_working_towards_marriage"
                  ? parseWorkingTowardsMarriageValue(value)
                  : parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <Descriptions title="Assets" bordered layout="vertical">
          {assets &&
            Object.entries(assets).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <Descriptions title="Liabilities" bordered layout="vertical">
          {liabilities &&
            Object.entries(liabilities).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <Descriptions title="Expenses" bordered layout="vertical">
          {expenses &&
            Object.entries(expenses).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <Descriptions title="Insurance" bordered layout="vertical">
          <Descriptions.Item label={"List of insurances"}>
            {insurance?.existing_insurance_policies && (
              <Table
                columns={columns}
                dataSource={insurance.existing_insurance_policies}
              />
            )}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Financial Goals" bordered layout="vertical">
          {financial_goals &&
            Object.entries(financial_goals).map(([key, value]) => (
              <Descriptions.Item key={key} label={DescriptionItemLabels[key]}>
                {parseFormValues(value)}
              </Descriptions.Item>
            ))}
        </Descriptions>
      </Space>
    </Modal>
  );
};

export type { Props };
export default ClientDetailsModal;
