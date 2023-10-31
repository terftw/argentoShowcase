import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import ClientDetailsModal from ".";

const meta: Meta<Props> = {
  title: "Client/ClientDetailsModal",
  component: ClientDetailsModal,
};

type Story = StoryObj<typeof ClientDetailsModal>;

export default meta;
export const Default: Story = {
  args: {
    client: {
      id: "1",
      attributes: {
        family: {
          is_working_towards_marriage: "1",
          marital_status: "single",
          num_children: "2",
        },
        insurance: {
          existing_insurance_policies: [],
        },
        financial_goals: {
          financial_needs: ["hospitalization"],
          desired_retirement_age: "2",
          desired_retirement_monthly_allowance: "2",
        },
        personal_info: {
          name: "Terence Chok",
          address: "1 Chong Kuo Road",
          mobile_number: "96201416",
          nric: "S9306932C",
          date_of_birth: "2023-09-01",
          gender: "male",
          email: "chalkterence@gmail.com",
        },
        employment: {
          employment_status: "full_time",
          employer: "test",
          occupation: "test",
          annual_income: "222",
          monthly_income: "22",
        },
        assets: {
          house_value: "2",
          bank_account_amount: "2",
          cpf_ordinary_account_amount: "2",
          cpf_special_account_amount: "2",
          cpf_medisave_account_amount: "2",
          investment_value: "2",
        },
        liabilities: {
          house_loan: "2",
          car_loan: "2",
          misc_loans: "2",
          income_taxes: "2",
        },
        expenses: {
          monthly_expenses: "2",
          monthly_investments: "2",
          monthly_savings: "2",
        },
      },
    },
  },
};
