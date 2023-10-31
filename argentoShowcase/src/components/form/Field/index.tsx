import type { Props as EditConfigurationProps } from "@/components/common/EditConfiguration";
import { Space, Form } from "antd";
import { FormItemProps, Rule } from "antd/es/form";
import EditConfiguration from "@/components/common/EditConfiguration";
import React from "react";
import styled from "@emotion/styled";

type FormItemConfig = {
  rules: Rule[];
  status: FormItemProps["validateStatus"];
  helpText: FormItemProps["help"];
  isLongText?: boolean;
};

type Props = {
  title: string;
  fieldContent: React.ReactElement;
  formItemConfig: FormItemConfig;
  footerConfig: EditConfigurationProps;
  isEditMode?: boolean;
};

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-margin-offset {
    margin-bottom: 0px !important;
  }
`;

const Field = ({
  title,
  fieldContent,
  formItemConfig: { rules, status, helpText, isLongText },
  footerConfig,
  isEditMode,
}: Props): React.ReactElement => {
  return (
    <>
      <StyledFormItem
        label={title}
        name={title}
        validateStatus={status}
        help={(status === "warning" || status === "error") && helpText}
        rules={rules}
        labelCol={isLongText ? { span: 24 } : undefined}
        style={{ marginBottom: 16 }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {fieldContent}
        </Space>
      </StyledFormItem>
      {isEditMode && <EditConfiguration {...footerConfig} />}
    </>
  );
};

export type { Props };
export default Field;
