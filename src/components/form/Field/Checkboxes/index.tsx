import React from "react";
import { Checkbox, Row, Col } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox/Group";

type CheckBoxOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: CheckBoxOption<T>[];
  onChange: CheckboxGroupProps["onChange"];
};

const Checkboxes = <T,>({
  options,
  onChange,
}: Props<T>): React.ReactElement => {
  return (
    <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
      <Row>
        {options.map(({ label, value }, index) => (
          <Col
            key={index}
            span={24}
            style={{ marginBottom: index === options.length - 1 ? 0 : 8 }}
          >
            <Checkbox value={value}>{label}</Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

export type { Props };
export default Checkboxes;
