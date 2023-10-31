export interface Map {
  [key: string]: string | undefined;
}

export type InsurancePolicy = {
  policy_name: string;
  policy_type: string[];
  annual_premium: string;
  sum_assured: string;
};

export type ClientAttributes = {
  family: {
    is_working_towards_marriage?: string;
    marital_status?: string;
    num_children?: string;
  };
  insurance: {
    existing_insurance_policies?: InsurancePolicy[];
  };
  financial_goals: {
    financial_needs?: string[];
    desired_retirement_age?: string;
    desired_retirement_monthly_allowance?: string;
  };
  personal_info: {
    name?: string;
    nric?: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    email?: string;
    mobile_number?: string;
  };
  employment: {
    employment_status?: string;
    employer?: string;
    occupation?: string;
    annual_income?: string;
    monthly_income?: string;
  };
  assets: {
    house_value?: string;
    bank_account_amount?: string;
    cpf_ordinary_account_amount?: string;
    cpf_special_account_amount?: string;
    cpf_medisave_account_amount?: string;
    investment_value?: string;
  };
  liabilities: {
    house_loan?: string;
    car_loan?: string;
    misc_loans?: string;
    income_taxes?: string;
  };
  expenses: {
    monthly_expenses?: string;
    monthly_investments?: string;
    monthly_savings?: string;
  };
};

export const DescriptionItemLabels: Map = {
  is_working_towards_marriage: "Working toward Marriage?",
  marital_status: "Marital Status",
  num_children: "Number of children",
  existing_insurance_policies: "Existing Insurance Policies",
  financial_needs: "Financial Needs",
  desired_retirement_age: "Desired Retirement Age",
  desired_retirement_monthly_allowance: "Desired Retirement Monthly Allowance",
  name: "Name",
  nric: "NRIC",
  date_of_birth: "Date of Birth (YYYY-MM-DD)",
  gender: "Gender",
  email: "Email",
  address: "Address",
  mobile_number: "Mobile Number",
  employment_status: "Employment Status",
  employer: "Employer",
  occupation: "Occupation",
  annual_income: "Annual Income",
  monthly_income: "Monthly Income",
  house_value: "House Value",
  bank_account_amount: "Bank Account Amount",
  cpf_ordinary_account_amount: "CPF Ordinary Account Amount",
  cpf_special_account_amount: "CPF Special Account Amount",
  cpf_medisave_account_amount: "CPF Medisave Account Amount",
  investment_value: "Investment Value",
  house_loan: "House Loan",
  car_loan: "Car Loan",
  misc_loans: "Misc. Loans",
  income_taxes: "Income Taxes",
  monthly_expenses: "Monthly Expenses",
  monthly_investments: "Monthly Investments",
  monthly_savings: "Monthly Savings",
} as const;
