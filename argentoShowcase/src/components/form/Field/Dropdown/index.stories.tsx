import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import Dropdown from ".";

const meta: Meta<Props<string>> = {
  title: "Form/Field/Dropdown",
  component: Dropdown,
};

type Story = StoryObj<typeof Dropdown>;

export default meta;
export const Default: Story = {
  args: {
    dropdownOptionsValues: [
      { label: "Alice", value: "alice" },
      { label: "Bob", value: "bob" },
      { label: "Charlie", value: "charlie" },
    ],
  },
};
