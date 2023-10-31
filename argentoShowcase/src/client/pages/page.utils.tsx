import React, { useContext } from "react";
import _get from "lodash/get";
import _compact from "lodash/compact";
import { Map } from "@/common/client";
import { Spin } from "antd";
import { useAsync } from "react-use";
import { usePathname } from "next/navigation";

import { logError } from "@/common/log.utils";
import { ClientContext } from "@/client/ClientRoot";
import {
  CoverageTypes,
  InsuranceCoverageData,
  InsuranceCoverageNames,
  SalaryAllocationData,
  TableDataType,
} from "@/components/report/constants";
import { KNOWN_FIELD } from "@/data/clientAttributes.spec.default";
import { parseNumber } from "@/common/parse.utils";
import { InsurancePolicy } from "@/common/client";
import { assertString } from "@/common/assert.utils";
import { parse as parseClientReportConfig } from "@/data/clientReportConfig.spec";

const AssetAndLiabilityTableLabels: Map = {
  [KNOWN_FIELD.HOUSE_VALUE[1]]: "Value of your house ($)",
  [KNOWN_FIELD.BANK_SAVINGS[1]]: "Bank account savings ($)",
  [KNOWN_FIELD.TOTAL_INVESTMENTS[1]]: "Value of your investments ($)",
  [KNOWN_FIELD.CPF_ORDINARY[1]]: "CPF OA",
  [KNOWN_FIELD.CPF_SPECIAL[1]]: "CPF SA",
  [KNOWN_FIELD.CPF_MEDISAVE[1]]: "CPF MA",
  [KNOWN_FIELD.HOUSE_LOAN[1]]: "Housing Loans",
  [KNOWN_FIELD.CAR_LOAN[1]]: "Car Loans",
  [KNOWN_FIELD.MISC_LOANS[1]]: "Misc. Loans",
  [KNOWN_FIELD.INCOME_TAX[1]]: "Annual Income Tax",
  [KNOWN_FIELD.MONTHLY_EXPENSES[1]]: "Monthly Expenses",
};

export function usePageData<T>(fn: () => Promise<T>, deps?: unknown[]) {
  const {
    page: { showMessage },
  } = useContext(ClientContext);
  const pathname = usePathname();

  const { loading, value: data } = useAsync(async () => {
    try {
      const data = await fn();
      return data;
    } catch (e) {
      const { message } = logError(e);
      showMessage(message, "error");
      throw e;
    }
  }, [pathname, ...(deps ?? [])]);

  const loader = loading ? <Spin /> : null;
  return { data, loader };
}

export const getMonthlyExpenses = (attrs: any): SalaryAllocationData[] => {
  const monthlyIncome =
    parseNumber(_get(attrs, KNOWN_FIELD.MONTHLY_INCOME)) ?? 0;
  const monthlyExpenses =
    parseNumber(_get(attrs, KNOWN_FIELD.MONTHLY_EXPENSES)) ?? 0;
  const monthlyInvestments =
    parseNumber(_get(attrs, KNOWN_FIELD.MONTHLY_INVESTMENTS)) ?? 0;
  const monthlySavings =
    parseNumber(_get(attrs, KNOWN_FIELD.MONTHLY_SAVINGS)) ?? 0;
  const monthlyExcess =
    monthlyIncome - monthlyExpenses - monthlyInvestments - monthlySavings;

  return _compact([
    monthlyExcess > 0 ? { name: "Excess", value: monthlyExcess } : null,
    monthlyExpenses > 0 ? { name: "Expenses", value: monthlyExpenses } : null,
    monthlyInvestments > 0
      ? { name: "Investments", value: monthlyInvestments }
      : null,
    monthlySavings > 0 ? { name: "Savings", value: monthlySavings } : null,
  ]);
};

export const getInsuranceCoverage = (attrs: any, reportConfigData: ReturnType<typeof parseClientReportConfig>): InsuranceCoverageData[] => {
  const insurancePlans = _get(
    attrs,
    KNOWN_FIELD.INSURANCE
  ) as InsurancePolicy[];

  const dtpdValue = insurancePlans
    .filter(
      ({ policy_type }) =>
        policy_type.includes("life_insurance") ||
        policy_type.includes("disability_insurance") ||
        policy_type.includes("personal_accident_insurance")
    )
    .map(({ sum_assured }) => Number(sum_assured))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  const ciValue = insurancePlans
    .filter(({ policy_type }) =>
      policy_type.includes("critical_illness_insurance")
    )
    .map(({ sum_assured }) => Number(sum_assured))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  return [
    {
      name: InsuranceCoverageNames.dtpd,
      [CoverageTypes.Current]: dtpdValue,
      [CoverageTypes.Optimal]: reportConfigData?.optimalDtpdCoverage ?? 1800,
    },
    {
      name: InsuranceCoverageNames.ci,
      [CoverageTypes.Current]: ciValue,
      [CoverageTypes.Optimal]: reportConfigData?.optimalCiCoverage ?? 2200,
    },
  ];
};

export const getAssets = (attrs: any): TableDataType[] => {
  const assets = [
    KNOWN_FIELD.HOUSE_VALUE,
    KNOWN_FIELD.BANK_SAVINGS,
    KNOWN_FIELD.TOTAL_INVESTMENTS,
    KNOWN_FIELD.CPF_ORDINARY,
    KNOWN_FIELD.CPF_SPECIAL,
    KNOWN_FIELD.CPF_MEDISAVE,
  ].map((field) => ({
    key: field[1],
    name: assertString(AssetAndLiabilityTableLabels[field[1]]),
    value: parseNumber(_get(attrs, field)) ?? 0,
  }));

  return assets;
};

export const getLiabilities = (attrs: any): TableDataType[] => {
  const insurancePlans = _get(
    attrs,
    KNOWN_FIELD.INSURANCE
  ) as InsurancePolicy[];

  const totalInsurancePremium = insurancePlans
    .map(({ annual_premium }) => Number(annual_premium))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  const liabilities = [
    KNOWN_FIELD.MONTHLY_EXPENSES,
    KNOWN_FIELD.HOUSE_LOAN,
    KNOWN_FIELD.CAR_LOAN,
    KNOWN_FIELD.MISC_LOANS,
    KNOWN_FIELD.INCOME_TAX,
  ]
    .map((field) => ({
      key: field[1],
      name: assertString(AssetAndLiabilityTableLabels[field[1]]),
      value: parseNumber(_get(attrs, field)) ?? 0,
    }))
    .concat({
      key: "annual_premium",
      name: "Annual Insurance Premiums",
      value: totalInsurancePremium,
    });

  return liabilities;
};
