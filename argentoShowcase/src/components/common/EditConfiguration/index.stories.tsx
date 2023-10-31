import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import EditConfiguration from ".";

const meta: Meta<Props> = {
  title: "Common/EditConfiguration",
  component: EditConfiguration,
};

type Story = StoryObj<typeof EditConfiguration>;

export default meta;
export const Default: Story = {
  args: {
    showField: true,
    isRequired: true,
    allowOthers: true,
    fieldEditPermissions: {
      canEditShowField: true,
      canEditIsRequired: true,
      canEditAllowOthers: true,
    },
    onShowFieldChange: () => console.log("show field change"),
    onIsRequiredChange: () => console.log("is required change"),
  },
};
