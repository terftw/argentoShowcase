import React from "react";
import { Input as AntdInput, InputProps } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";
import { isStatusWarningOrError } from "../helper";

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  status?: InputProps["status"];
};

const StringInput = ({
  placeholder,
  status,
  value,
  onChange,
}: Props): React.ReactElement => {
  return (
    <AntdInput
      placeholder={placeholder}
      status={status}
      prefix={isStatusWarningOrError(status) && <ExclamationOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export type { Props };
export default StringInput;
