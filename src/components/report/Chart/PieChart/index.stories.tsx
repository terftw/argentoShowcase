import type { Meta, StoryObj } from "@storybook/react";
import PieChart from ".";

const meta: Meta = {
  title: "Report/Chart/PieChart",
  component: PieChart,
};

type Story = StoryObj<typeof PieChart>;

export default meta;
export const Default: Story = {
  args: {
    title: "Monthly Expenses",
    data: [
      { name: "Excess", value: 400 },
      { name: "Investments", value: 300 },
      { name: "Savings", value: 300 },
      { name: "Expenses", value: 200 },
    ],
  },
};

export const InEditMode: Story = {
  args: {
    ...Default.args,
    isEditMode: true,
    footerConfig: {
      showField: false,
      isRequired: true,
      allowOthers: true,
      fieldEditPermissions: {
        canEditShowField: true,
        canEditIsRequired: true,
        canEditAllowOthers: true,
      },
      onShowFieldChange: () => console.log(),
      onIsRequiredChange: () => console.log(),
    },
  },
};
