import React from 'react';

import { Select, SelectProps } from "antd";

type DropdownOptionValue<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  dropdownOptionsValues: DropdownOptionValue<T>[];
  mode?: SelectProps["mode"];
  status?: SelectProps["status"];
  value?: string;
  onChange?: (value: string) => void;
};

const Dropdown = <T,>({
  dropdownOptionsValues,
  status,
  mode,
  value,
  onChange,
}: Props<T>): React.ReactElement => {
  return (
    <Select
      style={{ width: "100%" }}
      mode={mode}
      status={status}
      showSearch
      options={dropdownOptionsValues}
      value={value}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export type { Props };
export default Dropdown;
