import { FormSpec } from "@/common/formSpec";

export const KNOWN_FIELD = {
  NAME: ["personal_info", "name"],
  EMAIL: ["personal_info", "email"],
  MOBILE_NO: ["personal_info", "mobile_number"],
  MONTHLY_INCOME: ["employment", "monthly_income"],
  MONTHLY_EXPENSES: ["expenses", "monthly_expenses"],
  MONTHLY_INVESTMENTS: ["expenses", "monthly_investments"],
  MONTHLY_SAVINGS: ["expenses", "monthly_savings"],
  INSURANCE: ["insurance", "existing_insurance_policies"],
  BANK_SAVINGS: ["assets", "bank_account_amount"],
  HOUSE_VALUE: ["assets", "house_value"],
  CPF_ORDINARY: ["assets", "cpf_ordinary_account_amount"],
  CPF_SPECIAL: ["assets", "cpf_special_account_amount"],
  TOTAL_INVESTMENTS: ["assets", "investment_value"],
  CPF_MEDISAVE: ["assets", "cpf_medisave_account_amount"],
  HOUSE_LOAN: ["liabilities", "house_loan"],
  CAR_LOAN: ["liabilities", "car_loan"],
  MISC_LOANS: ["liabilities", "misc_loans"],
  INCOME_TAX: ["liabilities", "income_taxes"],
};

export const REQUIRED_FIELDS = [
  KNOWN_FIELD.NAME,
  KNOWN_FIELD.EMAIL,
  KNOWN_FIELD.MOBILE_NO,
];

export default {
  type: "object",
  properties: {
    personal_info: {
      type: "object",
      title: "Personal Information",
      properties: {
        name: {
          type: "string",
          title: "Name",
        },
        email: {
          type: "string",
          title: "Email",
        },
        mobile_number: {
          type: "string",
          title: "Mobile number",
        },
        nric: {
          type: "string",
          title: "NRIC",
        },
        date_of_birth: {
          type: "string",
          format: "date",
          title: "Date of Birth",
        },
        gender: {
          type: "string",
          title: "Gender",
          oneOf: [
            { const: "male", title: "Male" },
            { const: "female", title: "Female" },
          ],
        },
        address: {
          type: "string",
          title: "Address",
        },
      },
      required: [
        "name",
        "nric",
        "date_of_birth",
        "gender",
        "address",
        "email",
        "mobile_number",
      ],
    },
    employment: {
      type: "object",
      title: "Employment",
      properties: {
        employment_status: {
          type: "string",
          title: "Employment status",
          oneOf: [
            { const: "full_time", title: "Full Time" },
            { const: "part_time", title: "Part Time" },
            { const: "self_employed", title: "Self Employed" },
            { const: "not_employed", title: "Not Employed" },
          ],
        },
        employer: {
          type: "string",
          title: "Employer",
        },
        occupation: {
          type: "string",
          title: "Occupation",
        },
        annual_income: {
          type: "integer",
          title: "Annual Income ($)",
          $isHidden: true,
        },
        monthly_income: {
          type: "integer",
          title: "Monthly Income ($)",
        },
      },
      required: [
        "employment_status",
        "employer",
        "occupation",
        "monthly_income",
      ],
    },
    family: {
      type: "object",
      title: "Family",
      properties: {
        marital_status: {
          type: "string",
          title: "Marital status",
          oneOf: [
            { const: "single", title: "Single" },
            { const: "married", title: "Married" },
            { const: "divorced", title: "Divorced" },
            { const: "widowed", title: "Widowed" },
          ],
        },
        is_working_towards_marriage: {
          type: "boolean",
          title: "If you're not married, are you working towards marriage?",
          default: false,
        },
        num_children: {
          type: "integer",
          title: "Number of children",
          minimum: 0,
          maximum: 50,
        },
      },
      required: ["marital_status", "num_children"],
    },
    assets: {
      type: "object",
      title: "Assets",
      properties: {
        house_value: {
          type: "integer",
          title: "Value of your house ($)",
          minimum: 0,
        },
        bank_account_amount: {
          type: "integer",
          title: "Bank account savings ($)",
          minimum: 0,
        },
        cpf_ordinary_account_amount: {
          type: "integer",
          title: "CPF Ordinary Account ($)",
          minimum: 0,
        },
        cpf_special_account_amount: {
          type: "integer",
          title: "CPF Special Account ($)",
          minimum: 0,
        },
        cpf_medisave_account_amount: {
          type: "integer",
          title: "CPF Medisave Account ($)",
          minimum: 0,
        },
        investment_value: {
          type: "integer",
          title: "Value of your investments ($)",
          minimum: 0,
        },
      },
      required: [
        "house_value",
        "bank_account_amount",
        "cpf_ordinary_account_amount",
        "cpf_special_account_amount",
        "cpf_medisave_account_amount",
        "investment_value",
      ],
    },
    liabilities: {
      type: "object",
      title: "Liabilities",
      properties: {
        house_loan: {
          type: "integer",
          title: "House loan ($)",
          minimum: 0,
        },
        car_loan: {
          type: "integer",
          title: "Car loan ($)",
          minimum: 0,
        },
        misc_loans: {
          type: "integer",
          title: "Misc. loans ($)",
          minimum: 0,
        },
        income_taxes: {
          type: "integer",
          title: "Income taxes ($)",
          minimum: 0,
        },
      },
      required: ["house_loan", "car_loan", "misc_loans", "income_taxes"],
    },
    expenses: {
      type: "object",
      title: "Expenses",
      properties: {
        monthly_expenses: {
          type: "integer",
          title: "Monthly expenses ($)",
          minimum: 0,
        },
        monthly_investments: {
          type: "integer",
          title: "Monthly investments ($)",
          minimum: 0,
        },
        monthly_savings: {
          type: "integer",
          title: "Monthly savings ($)",
          minimum: 0,
        },
      },
      required: ["monthly_expenses", "monthly_investments", "monthly_savings"],
    },
    insurance: {
      type: "object",
      title: "Insurance",
      properties: {
        existing_insurance_policies: {
          type: "array",
          title: "Existing insurance policies",
          items: {
            type: "object",
            properties: {
              policy_name: {
                type: "string",
                title: "Policy name",
              },
              policy_type: {
                type: "array",
                title: "Policy type",
                uniqueItems: true,
                items: {
                  type: "string",
                  oneOf: [
                    { const: "health_insurance", title: "Health insurance" },
                    { const: "life_insurance", title: "Life insurance" },
                    {
                      const: "disability_insurance",
                      title: "Disability insurance",
                    },
                    {
                      const: "personal_accident_insurance",
                      title: "Personal accident insurance",
                    },
                    {
                      const: "critical_illness_insurance",
                      title: "Critical illness insurance",
                    },
                  ],
                },
              },
              annual_premium: {
                type: "integer",
                title: "Annual premium ($)",
                minimum: 0,
              },
              sum_assured: {
                type: "integer",
                title: "Sum assured ($)",
                minimum: 0,
              },
            },
            required: ["policy_name", "annual_premium"],
          },
        },
      },
      required: [],
    },
    financial_goals: {
      type: "object",
      title: "Financial Goals",
      properties: {
        desired_retirement_age: {
          type: "integer",
          title: "Desired retirement age",
          minimum: 0,
          maximum: 100,
        },
        desired_retirement_monthly_allowance: {
          type: "integer",
          title: "Desired monthly allowance during retirement ($)",
        },
        financial_needs: {
          type: "array",
          uniqueItems: true,
          title: "Finanical needs",
          items: {
            type: "string",
            oneOf: [
              { const: "retirement_planning", title: "Retirement planning" },
              { const: "education_planning", title: "Education planning" },
              { const: "wealth_enhancement", title: "Wealth enhancement" },
              { const: "protection", title: "Protection" },
              {
                const: "early_critical_illness",
                title: "Early critical illness",
              },
              { const: "hospitalization", title: "Hospitalization" },
              { const: "mortgage_protection", title: "Mortgage protection" },
              { const: "legacy_planning", title: "Legacy planning" },
            ],
          },
        },
      },
      required: [
        "desired_retirement_age",
        "desired_retirement_monthly_allowance",
      ],
    },
  },
} as FormSpec;
