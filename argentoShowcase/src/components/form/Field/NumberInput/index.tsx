import React from 'react';
import { InputNumber as AntdInputNumber, InputNumberProps } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";
import { isStatusWarningOrError } from "../helper";

type InputNumberMode = "currency" | "percentage" | "default";

type Props = {
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
  status?: InputNumberProps["status"];
  mode?: InputNumberMode;
};

const selectParser = (mode?: InputNumberMode, value?: string): number => {
  switch (mode) {
    case "currency":
      return parseFloat(value!.replace(/\$\s?|(,*)/g, ""));
    case "percentage":
      return parseFloat(value!.replace("%", ""));
    case "default":
    default:
      return parseFloat(value!);
  }
};

const selectFormatter = (mode?: InputNumberMode, value?: number): string => {
  switch (mode) {
    case "currency":
      return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    case "percentage":
      return `${value}%`;
    case "default":
    default:
      return value?.toString() ?? "";
  }
};

const NumberInput = ({
  placeholder,
  status,
  value,
  onChange,
  mode,
}: Props): React.ReactElement => {
  return (
    <AntdInputNumber
      placeholder={placeholder}
      status={status}
      value={value}
      onChange={(value) => onChange(value ?? 0)}
      prefix={isStatusWarningOrError(status) && <ExclamationOutlined />}
      parser={(value) => selectParser(mode, value)}
      formatter={(value) => selectFormatter(mode, value)}
    />
  );
};

export type { Props };
export default NumberInput;
