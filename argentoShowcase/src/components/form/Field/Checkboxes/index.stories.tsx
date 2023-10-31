import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import Checkboxes from ".";

const meta: Meta<Props<string>> = {
  title: "Form/Field/Checkboxes",
  component: Checkboxes,
};

type Story = StoryObj<typeof Checkboxes>;

export default meta;
export const Default: Story = {
  args: {
    options: [
      { label: "Apple", value: "Apple" },
      { label: "Pear", value: "Pear" },
      { label: "Orange", value: "Orange" },
    ],
  },
};
