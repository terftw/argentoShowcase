import type { Meta, StoryObj } from "@storybook/react";
import Report from ".";
import {
  CoverageTypes,
  InsuranceCoverageNames,
  sampleAssetList,
  sampleLiabilityList,
  sampleSalaryAllocationDataList,
} from "./constants";

const meta: Meta = {
  title: "Report",
  component: Report,
};

type Story = StoryObj<typeof Report>;

export default meta;
export const Default: Story = {
  args: {
    title: "Financial Report",
    titleTypographyLevel: 2,
    monthlyExpenses: sampleSalaryAllocationDataList,
    insuranceCoverage: [
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
    assets: sampleAssetList,
    liabilities: sampleLiabilityList,
  },
};

export const InEditMode: Story = {
  args: {
    ...Default.args,
    isEditMode: true,
    footerConfigs: {
      expenses: {
        showField: true,
        fieldEditPermissions: {
          canEditShowField: true,
        },
        onShowFieldChange: () => console.log(),
      },
      insurance: {
        showField: true,
        fieldEditPermissions: {
          canEditShowField: true,
        },
        onShowFieldChange: () => console.log(),
      },
      assets: {
        showField: true,
        fieldEditPermissions: {
          canEditShowField: true,
        },
        onShowFieldChange: () => console.log(),
      },
      liabilities: {
        showField: true,
        fieldEditPermissions: {
          canEditShowField: true,
        },
        onShowFieldChange: () => console.log(),
      },
    },
  },
};
