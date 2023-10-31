import type { Meta, StoryObj } from "@storybook/react";
import Table from ".";

const meta: Meta = {
  title: "Report/Table",
  component: Table,
};

type Story = StoryObj<typeof Table>;

export default meta;
export const Default: Story = {
  args: {
    title: "Total Assets",
    titleTypographyLevel: 4,
    data: [
      { key: "1", name: "Housing", value: 400 },
      { key: "2", name: "Total Savings", value: 123892 },
      { key: "3", name: "Total Investments", value: 2312 },
      { key: "4", name: "CPF OA", value: 5521 },
      { key: "5", name: "CPF SA", value: 22231 },
      { key: "6", name: "CPF MA", value: 666 },
    ],
    columns: [
      {
        title: "Type of Asset",
        dataIndex: "name",
      },
      {
        title: "Value (in SGD)",
        dataIndex: "value",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.value - b.value,
      },
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
