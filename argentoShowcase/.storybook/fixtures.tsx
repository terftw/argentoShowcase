import React, { PropsWithChildren } from "react";
import { ConfigProvider } from "antd";

import theme from "../src/theme";

const FixturesProvider = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export { FixturesProvider };
