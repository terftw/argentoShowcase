import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { Props } from ".";
import Section from ".";
import StringInput from "../Field/StringInput";
import Field from "../Field";
import RadioGroup from "../Field/RadioGroup";

const meta: Meta<Props> = {
  title: "Form/Section",
  component: Section,
};

type Story = StoryObj<typeof Section>;

export default meta;
export const Default: Story = {
  args: {
    title: "Basic Information",
    titleTypographyLevel: 4,
    children: (
      <>
        <Field
          title="Name"
          fieldContent={
            <StringInput
              placeholder="Enter your client's name"
              value=""
              onChange={() => console.log()}
            />
          }
          formItemConfig={{
            rules: [{ required: true, message: "Enter your client's name" }],
            status: "",
            helpText: "Client's name should not be empty",
          }}
          footerConfig={{
            showField: true,
            isRequired: true,
            allowOthers: false,
            fieldEditPermissions: {
              canEditShowField: true,
              canEditIsRequired: true,
              canEditAllowOthers: false,
            },
            onShowFieldChange: () => console.log(),
            onIsRequiredChange: () => console.log(),
          }}
        />
        <Field
          title="Number of children"
          fieldContent={
            <RadioGroup
              groupOptionsValues={[
                { option: "1", value: 1 },
                { option: "2", value: 2 },
                { option: "3", value: 3 },
              ]}
              value={1}
            />
          }
          formItemConfig={{
            rules: [{ required: true, message: "Choose number of children" }],
            status: "",
            helpText: "At least one option should be chosen",
          }}
          footerConfig={{
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
          }}
        />
      </>
    ),
  },
};

export const Editable: Story = {
  args: {
    title: "Editable Section Title",
    titleTypographyLevel: 4,
    isEditMode: true,
    handleOnTitleChange: (title: string) => console.log(title),
    children: (
      <>
        <Field
          title="Name"
          fieldContent={
            <StringInput
              placeholder="Enter your client's name"
              value=""
              onChange={() => console.log()}
            />
          }
          formItemConfig={{
            rules: [{ required: true, message: "Enter your client's name" }],
            status: "",
            helpText: "Client's name should not be empty",
          }}
          footerConfig={{
            showField: true,
            isRequired: true,
            allowOthers: false,
            fieldEditPermissions: {
              canEditShowField: true,
              canEditIsRequired: true,
              canEditAllowOthers: false,
            },
            onShowFieldChange: () => console.log(),
            onIsRequiredChange: () => console.log(),
          }}
          isEditMode
        />
        <Field
          title="Number of children"
          fieldContent={
            <RadioGroup
              groupOptionsValues={[
                { option: "1", value: 1 },
                { option: "2", value: 2 },
                { option: "3", value: 3 },
              ]}
              value={1}
            />
          }
          formItemConfig={{
            rules: [{ required: true, message: "Choose number of children" }],
            status: "",
            helpText: "At least one option should be chosen",
          }}
          footerConfig={{
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
          }}
          isEditMode
        />
      </>
    ),
  },
};
