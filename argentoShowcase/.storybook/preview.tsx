import type { Decorator, Preview } from "@storybook/react";
import { ConfigProvider } from "antd";
import React from "react";
import { FixturesProvider } from "./fixtures";

const preview: Preview = {
  decorators: [
    (Story) => (
      <FixturesProvider>
        <Story />
      </FixturesProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
