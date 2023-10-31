import { InputNumberProps, InputProps } from "antd";

const isStatusWarningOrError = (
  status: InputNumberProps["status"] | InputProps["status"]
): boolean => status === "warning" || status === "error";

export { isStatusWarningOrError };
