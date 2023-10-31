import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

type Props = {
  showTime: boolean;
  status?: "error" | "warning";
  value: string; // String representation of the datetime e.g. "YYYY-MM-DD"
  onChange: (value?: string) => void;
};

const DateTime = ({
  showTime,
  status,
  value,
  onChange,
}: Props): React.ReactElement => {
  return (
    <DatePicker showTime={showTime} status={status} onChange={(value) => onChange(value?.format('YYYY-MM-DD'))} value={dayjs(value)} />
  );
};

export type { Props };
export default DateTime;
