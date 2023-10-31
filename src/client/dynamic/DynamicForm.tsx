"use client";

import React, { useState } from "react";
import { Button, Card, Switch } from "antd";
import Form, { getDefaultRegistry } from "@rjsf/core";
import {
  FieldTemplateProps,
  WidgetProps,
  IconButtonProps,
  TitleFieldProps,
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps
} from "@rjsf/utils";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import _isEqual from "lodash/isEqual";

import { FormSpec } from "@/common/formSpec";
import Section from "@/components/form/Section";
import { validator, getIsHidden, getSchemaPath, toRJSFFormData, toRJSFSchema } from "./dynamicForm.utils";
import Field from "@/components/form/Field";
import StringInput from "@/components/form/Field/StringInput";
import NumberInput from "@/components/form/Field/NumberInput";
import DateTime from "@/components/form/Field/DateTime";
import Dropdown from "@/components/form/Field/Dropdown";
import { useLoadingTracker } from "@/client/loading/loading.utils";
import { REQUIRED_FIELDS } from "@/data/clientAttributes.spec.default";
import { modifyFormSpecIsHidden, modifyFormSpecIsRequired } from "@/common/formSpec.utils";

const {
  templates: {
    FieldTemplate: RjsfFieldTemplate,
    BaseInputTemplate: RjsfBaseInputTemplate,
  },
} = getDefaultRegistry();

export interface Props {
  formSpec: FormSpec;
  formData?: object;
  isEditMode?: boolean;
  onSubmit?: (data: object) => Promise<void>;
  onFormSpecChange?: (formSpec: FormSpec) => Promise<void>;
}

export default function DynamicForm(props: Props) {
  const {
    formSpec: initialFormSpec,
    formData: initialFormData,
    onSubmit,
    onFormSpecChange,
  } = props;
  const { isLoading, trackLoading } = useLoadingTracker();
  const isEditMode = props.isEditMode ?? false;
  const [formSpec, setFormSpec] = useState(initialFormSpec);
  const [formData, setFormData] = useState(initialFormData ?? {});

  return (
    <>
      <Form
        schema={toRJSFSchema(formSpec, isEditMode)}
        formData={toRJSFFormData(formData, formSpec, isEditMode)}
        disabled={isLoading}
        templates={{
          FieldTemplate: (props: FieldTemplateProps) => {
            return (
              <FieldTemplate
                isEditMode={isEditMode}
                setFormSpec={setFormSpec}
                {...props}
              />
            );
          },
          TitleFieldTemplate,
          ArrayFieldTemplate,
          ButtonTemplates: {
            SubmitButton: isEditMode
              ? () => null
              : () => {
                return <SubmitButton isLoading={isLoading} />;
              },
            AddButton: isEditMode ? () => null : AddButton,
            RemoveButton: isEditMode ? () => null : RemoveButton,
          },
        }}
        widgets={{
          TextWidget,
          DateWidget,
          SelectWidget,
          CheckboxWidget,
        }}
        validator={validator}
        onSubmit={trackLoading(async ({ formData }) => {
          setFormData(formData);
          await onSubmit?.(formData);
        })}
      />
      {isEditMode ? (
        <Button
          type="primary"
          loading={isLoading}
          onClick={trackLoading(async () => {
            await onFormSpecChange?.(formSpec);
          })}
        >
          Save Form
        </Button>
      ) : null}
    </>
  );
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="primary" htmlType="submit" loading={isLoading}>
      Submit
    </Button>
  );
}

function AddButton(props: IconButtonProps) {
  const { onClick } = props;
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
      style={{ float: "right" }}
    >
      Add Item
    </Button>
  );
}

function RemoveButton(props: IconButtonProps) {
  const { onClick } = props;
  return (
    <Button type="primary" danger icon={<DeleteOutlined />} onClick={onClick} />
  );
}

function DateWidget(props: WidgetProps) {
  const { value, onChange } = props;

  return <DateTime showTime={false} value={value} onChange={onChange} />;
}

function CheckboxWidget(props: WidgetProps) {
  const { value, onChange } = props;
  return <Switch checked={value} onChange={onChange} />;
}

function TextWidget(props: WidgetProps) {
  const { schema, placeholder, value, onChange } = props;

  if (schema.type == "string") {
    return (
      <StringInput
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
      />
    );
  } else if (schema.type == "integer") {
    return (
      <NumberInput
        placeholder={placeholder ?? ""}
        mode="default"
        value={value}
        onChange={onChange}
      />
    );
  }

  return <RjsfBaseInputTemplate {...props} />;
}

function SelectWidget(props: WidgetProps) {
  const {
    value,
    onChange,
    options: { enumOptions },
    multiple,
  } = props;
  return (
    <Dropdown
      mode={multiple ? "multiple" : undefined}
      value={value}
      onChange={onChange}
      dropdownOptionsValues={enumOptions ?? []}
    />
  );
}

function FieldTemplate(
  props: FieldTemplateProps & {
    isEditMode: boolean;
    setFormSpec: (update: (formSpec: FormSpec) => FormSpec) => void;
  }
) {
  const { help, label, children, required, schema, isEditMode, setFormSpec } =
    props;
  const schemaPath = getSchemaPath(schema);
  const [isRequired, setIsRequired] = useState(required ?? false);
  const [showField, setShowField] = useState(!getIsHidden(schema));
  const isRequiredField = !!REQUIRED_FIELDS.find((x) =>
    _isEqual(x, schemaPath)
  );

  if (schema.type != "object") {
    return (
      <Field
        title={label}
        isEditMode={isEditMode}
        formItemConfig={{
          rules: [{ required: isRequired }],
          status: "",
          helpText: help,
          isLongText:
            ((schema.type == "string" && schema.format != "date") || (schema.type == 'array')),
        }}
        footerConfig={{
          showField,
          isRequired,
          allowOthers: false,
          fieldEditPermissions: {
            canEditIsRequired: isEditMode && !isRequiredField && showField,
            canEditShowField: isEditMode && !isRequiredField,
            canEditAllowOthers: false,
          },
          onIsRequiredChange: (isRequired: boolean) => {
            setIsRequired(isRequired);
            setFormSpec((x) =>
              modifyFormSpecIsRequired(x, schemaPath, isRequired)
            );
          },
          onShowFieldChange: (showField: boolean) => {
            setShowField(showField);
            setFormSpec((x) => {
              return modifyFormSpecIsHidden(x, schemaPath, !showField);
            });
          },
        }}
        fieldContent={children}
      />
    );
  }

  return <RjsfFieldTemplate {...props} />;
}

function TitleFieldTemplate(props: TitleFieldProps) {
  const { title, schema } = props;
  const schemaPath = getSchemaPath(schema);

  if (
    schemaPath.length != 1 ||
    Object.keys(schema?.properties ?? {}).length === 0
  ) {
    return null;
  }

  return <Section title={title} titleTypographyLevel={3} />;
}

function ArrayFieldItemTemplate(props: ArrayFieldTemplateItemType) {
  const {
    registry,
    children,
    onDropIndexClick,
    index,
    disabled,
    readonly,
    uiSchema,
  } = props;
  const { RemoveButton } = registry.templates.ButtonTemplates;

  return (
    <Card
      style={{ margin: 8, marginBottom: 16 }}
      extra={
        <RemoveButton
          disabled={disabled || readonly}
          onClick={onDropIndexClick(index)}
          uiSchema={uiSchema}
          registry={registry}
        />
      }
    >
      {children}
    </Card>
  );
}

function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  const {
    registry,
    idSchema,
    onAddClick,
    items,
  } = props;

  const { AddButton } = registry.templates.ButtonTemplates;

  return (
    <fieldset id={idSchema.$id}>
      <div>
        {items &&
          items.map(({ key, ...itemProps }) => (
            <ArrayFieldItemTemplate key={key} {...itemProps} />
          ))}
      </div>
      <AddButton
        onClick={onAddClick}
        registry={registry}
      />
    </fieldset>
  );
}
