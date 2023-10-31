import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import DateTime from ".";

const meta: Meta<Props> = {
  title: "Form/Field/DateTime",
  component: DateTime,
};

type Story = StoryObj<typeof DateTime>;

export default meta;
export const Default: Story = {
  args: {
    showTime: false,
  },
};
