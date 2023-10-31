import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import Field from ".";
import StringInput from "./StringInput";

const meta: Meta<Props> = {
  title: "Form/Field",
  component: Field,
};

type Story = StoryObj<typeof Field>;

export default meta;

export const WithFieldContent: Story = {
  args: {
    title: "Name",
    formItemConfig: {
      rules: [{ required: true, message: "Enter your client's name" }],
      status: "",
      helpText: "Client's name should not be empty",
      isLongText: true,
    },
    footerConfig: {
      showField: true,
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
    fieldContent: (
      <StringInput
        placeholder="Enter your client's name"
        value=""
        onChange={() => console.log()}
      />
    ),
  },
};

export const InEditMode: Story = {
  args: {
    ...WithFieldContent.args,
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
    isEditMode: true,
  },
};
