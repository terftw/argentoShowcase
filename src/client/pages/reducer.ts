import { fail } from "assert";
import { Reducer } from "react";
import { PartialDeep } from "type-fest/source/partial-deep";

export type ClientReportConfiguration = {
  expenses: {
    hide_expenses_breakdown: boolean;
  };
  insurance: {
    hide_insurance_coverage: boolean;
    optimal_ci_coverage: number;
    optimal_dtpd_coverage: number;
  };
  assets: {
    hide_assets_breakdown: boolean;
  };
  liabilities: {
    hide_liabilities_breakdown: boolean;
  };
};

export const initialClientReportConfiguration: ClientReportConfiguration = {
  expenses: {
    hide_expenses_breakdown: false,
  },
  insurance: {
    hide_insurance_coverage: false,
    optimal_ci_coverage: 2200,
    optimal_dtpd_coverage: 2800,
  },
  assets: {
    hide_assets_breakdown: false,
  },
  liabilities: {
    hide_liabilities_breakdown: false,
  },
};

type UpdateClientReportConfigurationAction = {
  type: "UPDATE_CLIENT_REPORT_CONFIGURATION";
  payload: PartialDeep<ClientReportConfiguration>;
};

type UpdateClientReportInsuranceAction = {
  type: "UPDATE_CLIENT_REPORT_INSURANCE";
  payload: PartialDeep<ClientReportConfiguration["insurance"]>;
};

export const clientReportConfigurationReducer: Reducer<
  ClientReportConfiguration,
  UpdateClientReportConfigurationAction | UpdateClientReportInsuranceAction
> = (state, action) => {
  switch (action.type) {
    case "UPDATE_CLIENT_REPORT_CONFIGURATION":
      return { ...state, ...action.payload } as ClientReportConfiguration;
    case "UPDATE_CLIENT_REPORT_INSURANCE":
      return {
        ...state,
        insurance: { ...state.insurance, ...action.payload },
      };
    default:
      fail(`Didn't expect to get here: ${action}`);
  }
};
