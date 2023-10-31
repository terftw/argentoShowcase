import type { Meta, StoryObj } from "@storybook/react";
// import type { Props } from ".";
import BarChart from ".";
import { CoverageTypes, InsuranceCoverageNames } from "../../constants";

const meta: Meta = {
  title: "Report/Chart/BarChart",
  component: BarChart,
};

type Story = StoryObj<typeof BarChart>;

export default meta;
export const Default: Story = {
  args: {
    title: "Insurance Coverage",
    data: [
      {
        name: InsuranceCoverageNames.dtpd,
        [CoverageTypes.Current]: 2400,
        [CoverageTypes.Optimal]: 1800,
      },
      {
        name: InsuranceCoverageNames.ci,
        [CoverageTypes.Current]: 1800,
        [CoverageTypes.Optimal]: 2200,
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
