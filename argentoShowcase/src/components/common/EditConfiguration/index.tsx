import { Typography, Space, Switch, Divider } from "antd";
import theme from "@/theme";
import React from "react";

type Props = {
  showField?: boolean;
  isRequired?: boolean;
  allowOthers?: boolean;
  fieldEditPermissions: {
    canEditShowField?: boolean;
    canEditIsRequired?: boolean;
    canEditAllowOthers?: boolean;
  };
  onShowFieldChange?: (showField: boolean) => void;
  onIsRequiredChange?: (isRequired: boolean) => void;
};

const { Text } = Typography;
const { colorPrimary } = theme.token;

const EditConfiguration = ({
  showField,
  isRequired,
  allowOthers,
  fieldEditPermissions: {
    canEditShowField,
    canEditIsRequired,
    canEditAllowOthers,
  },
  onShowFieldChange,
  onIsRequiredChange,
}: Props): React.ReactElement => {
  const showEditComponent =
    canEditShowField || canEditIsRequired || canEditAllowOthers;

  if (!showEditComponent) return <></>;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: showField ? "flex-end" : "space-between",
          paddingBottom: 8,
        }}
      >
        {!showField && (
          <Text type="warning">This field will be hidden in the form</Text>
        )}

        <Space size="large">
          {canEditIsRequired && (
            <Space>
              <Text>Required</Text>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={isRequired}
                onChange={onIsRequiredChange}
              />
            </Space>
          )}
          {canEditAllowOthers && (
            <Space>
              <Text>Allow Others</Text>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={allowOthers}
              />
            </Space>
          )}
          {canEditShowField && (
            <Space>
              <Text>Display field</Text>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked={showField}
                onChange={onShowFieldChange}
              />
            </Space>
          )}
        </Space>
      </div>
      <Divider
        style={{
          border: `1px solid ${colorPrimary}`,
          marginTop: 8,
          marginBottom: 32,
        }}
      />
    </>
  );
};

export type { Props };
export default EditConfiguration;
