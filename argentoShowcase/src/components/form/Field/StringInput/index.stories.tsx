import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import StringInput from ".";

const meta: Meta<Props> = {
  title: "Form/Field/StringInput",
  component: StringInput,
};

type Story = StoryObj<typeof StringInput>;

export default meta;
export const Default: Story = {
  args: {
    placeholder: "Enter information here",
  },
};
