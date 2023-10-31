import _get from 'lodash/get';

import { FormSpec } from "@/common/formSpec";
import { parseBoolean, parseNumber } from "@/common/parse.utils";

const KNOWN_FIELD = {
  HIDE_EXPENSES_BREAKDOWN: ["expenses", "hide_expenses_breakdown"],
  HIDE_INSURANCE_COVERAGE: ["insurance", "hide_insurance_coverage"],
  OPTIMAL_DTPD_COVERAGE: ["insurance", "optimal_dtpd_coverage"],
  OPTIMAL_CI_COVERAGE: ["insurance", "optimal_ci_coverage"],
  HIDE_ASSETS_BREAKDOWN: ["assets", "hide_assets_breakdown"],
  HIDE_LIABILITIES_BREAKDOWN: ["liabilities", "hide_liabilities_breakdown"],
};

export function parse(data: object) {
  return {
    hideExpensesBreakdown: parseBoolean(_get(data, KNOWN_FIELD.HIDE_EXPENSES_BREAKDOWN)),
    hideInsuranceCoverage: parseBoolean(_get(data, KNOWN_FIELD.HIDE_INSURANCE_COVERAGE)),
    optimalDtpdCoverage: parseNumber(_get(data, KNOWN_FIELD.OPTIMAL_DTPD_COVERAGE)),
    optimalCiCoverage: parseNumber(_get(data, KNOWN_FIELD.OPTIMAL_CI_COVERAGE)),
    hideAssetsBreakdown: parseBoolean(_get(data, KNOWN_FIELD.HIDE_ASSETS_BREAKDOWN)),
    hideLiabilitiesBreakdown: parseBoolean(_get(data, KNOWN_FIELD.HIDE_LIABILITIES_BREAKDOWN))
  }
}

export default {
  type: "object",
  properties: {
    expenses: {
      type: "object",
      properties: {
        hide_expenses_breakdown: {
          type: "boolean",
          default: false
        }
      }
    },
    insurance: {
      type: "object",
      properties: {
        hide_insurance_coverage: {
          type: "boolean",
          default: false,
        },
        optimal_dtpd_coverage: {
          type: "integer",
          default: 1800,
          minimum: 0
        },
        optimal_ci_coverage: {
          type: "integer",
          default: 2200,
          minimum: 0
        },
      }
    },
    assets: {
      type: "object",
      properties: {
        hide_assets_breakdown: {
          type: "boolean",
          default: false,
        }
      }
    },
    liabilities: {
      type: "object",
      properties: {
        hide_liabilities_breakdown: {
          type: "boolean",
          default: false,
        }
      }
    }
  },
} as FormSpec;
