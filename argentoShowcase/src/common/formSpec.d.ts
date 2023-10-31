export interface FormSpec {
    type: 'object';
    properties: {
        [sectionName: string]: FormSectionSpec;
    }
}

export interface FormSectionSpec extends FormFieldObjectSpec {
    title?: string;
}

export type FormFieldSpec = FormFieldStringSpec | FormFieldBooleanSpec | FormFieldIntegerSpec | FormFieldDateStringSpec | FormFieldArraySpec;

export interface FormFieldBooleanSpec extends BaseFormFieldSpec {
    type: 'boolean';
    default?: boolean;
}

export interface FormFieldIntegerSpec extends BaseFormFieldSpec {
    type: 'integer';
    minimum?: number;
    maximum?: number;
    default?: number;
}

export interface FormFieldStringSpec extends BaseFormFieldSpec {
    type: 'string';
    oneOf?: { const: string; title: string }[];
    default?: string;
}

export interface FormFieldDateStringSpec extends BaseFormFieldSpec {
    type: 'string'
    format: 'date'
}

export interface FormFieldArraySpec extends BaseFormFieldSpec {
    type: 'array';
    uniqueItems?: boolean;
    items: FormFieldObjectSpec | FormFieldArrayItemStringSpec;
}

export interface FormFieldObjectSpec {
    type: 'object';
    properties: {
        [fieldName: string]: FormFieldSpec;
    };
    required?: string[];
}

export interface FormFieldArrayItemStringSpec {
    type: 'string';
    oneOf?: { const: string; title: string }[];
}

interface BaseFormFieldSpec {
    type: string;
    $isHidden?: boolean;
}