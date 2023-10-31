import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import RadioGroup from ".";

const meta: Meta<Props<number>> = {
  title: "Form/Field/RadioGroup",
  component: RadioGroup,
};

type Story = StoryObj<typeof RadioGroup>;

export default meta;
export const Default: Story = {
  args: {
    groupOptionsValues: [
      { option: "Option 1", value: 1 },
      { option: "Option 2", value: 2 },
      { option: "Option 3", value: 3 },
    ],
    value: 1,
  },
};
