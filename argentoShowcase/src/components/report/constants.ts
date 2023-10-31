const CoverageTypes = {
  Current: "Current Coverage",
  Optimal: "Optimal Coverage",
} as const;

const InsuranceCoverageNames = {
  dtpd: "Death / TPD",
  ci: "Critical Illness",
} as const;

type InsuranceCoverageData = {
  name: string;
  [CoverageTypes.Current]: number;
  [CoverageTypes.Optimal]: number;
};

type SalaryAllocationData = {
  name: string;
  value: number;
};

type TableDataType = {
  key: React.Key;
  name: string;
  value: number;
};

const sampleSalaryAllocationDataList: SalaryAllocationData[] = [
  { name: "Excess", value: 1000 },
  { name: "Investments", value: 1000 },
  { name: "Savings", value: 1000 },
  { name: "Expenses", value: 1000 },
];

const sampleAssetList: TableDataType[] = [
  { key: "1", name: "Housing", value: 400 },
  { key: "2", name: "Total Savings", value: 123892 },
  { key: "3", name: "Total Investments", value: 2312 },
  { key: "4", name: "CPF OA", value: 5521 },
  { key: "5", name: "CPF SA", value: 22231 },
  { key: "6", name: "CPF MA", value: 666 },
];

const sampleLiabilityList: TableDataType[] = [
  { key: "1", name: "Monthly Expenses", value: 400 },
  { key: "2", name: "Housing Loans", value: 123892 },
  { key: "3", name: "Car Loans", value: 2312 },
  { key: "4", name: "Misc. Loans", value: 5521 },
  { key: "5", name: "Annual Income Tax", value: 22231 },
  { key: "6", name: "Annual Insurance Premiums", value: 666 },
];

export type { InsuranceCoverageData, SalaryAllocationData, TableDataType };
export {
  CoverageTypes,
  InsuranceCoverageNames,
  sampleSalaryAllocationDataList,
  sampleAssetList,
  sampleLiabilityList,
};
