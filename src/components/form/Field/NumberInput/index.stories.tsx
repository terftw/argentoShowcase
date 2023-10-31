import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import NumberInput from ".";

const meta: Meta<Props> = {
  title: "Form/Field/NumberInput",
  component: NumberInput,
};

type Story = StoryObj<typeof NumberInput>;

export default meta;
export const Default: Story = {
  args: {
    placeholder: "0",
  },
};
