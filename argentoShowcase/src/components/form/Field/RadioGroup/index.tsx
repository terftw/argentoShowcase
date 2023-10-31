import React from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space } from "antd";

type GroupOptionValue<T> = {
  option: string;
  value: T;
};

type Props<T> = {
  groupOptionsValues: GroupOptionValue<T>[];
  value: T;
  onChange?: (event: RadioChangeEvent) => void;
};

const RadioGroup = <T,>({
  groupOptionsValues,
  value,
  onChange,
}: Props<T>): React.ReactElement => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        {groupOptionsValues.map(({ option, value }) => (
          <Radio key={option} value={value}>{option}</Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export type { Props };
export default RadioGroup;
