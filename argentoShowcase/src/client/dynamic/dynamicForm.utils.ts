import _mapValues from 'lodash/mapValues';
import _set from 'lodash/set';
import _get from 'lodash/get';
import { RJSFSchema, ValidatorType } from '@rjsf/utils';

import { FormFieldObjectSpec, FormFieldSpec, FormSpec } from "@/common/formSpec";
import { filterDefinedValues } from '@/common/object.utils';

export function toRJSFSchema(formSpec: FormSpec, isEditMode: boolean): RJSFSchema {
    const properties = _mapValues(formSpec.properties, (sectionSpec, sectionName) => {
        const x = annotateSchemaPath(sectionSpec, [sectionName]);
        return {
            ...x,
            properties: filterDefinedValues(
                _mapValues(x.properties, (y) => {
                    return isEditMode ? y : removeFieldIfHidden(y);
                })
            )
        }
    });
    return { ...formSpec, properties };
}

export function toRJSFFormData(formData: object, formSpec: FormSpec, isEditMode: boolean): object {
    let newFormData = formData;

    if (isEditMode) {
        for (const [sectionName, sectionSpec] of Object.entries(formSpec.properties)) {
            for (const [fieldName, fieldSpec] of Object.entries(sectionSpec.properties)) {
                const fieldValue = _get(newFormData, [sectionName, fieldName]);

                // For object arrays, in edit mode, we just want exactly 1 value
                if (fieldSpec.type == 'array' && fieldSpec.items.type == 'object') {
                    const singleArrayItem = (fieldValue as any[] ?? [])[0] ?? {};
                    newFormData = _set(newFormData, [sectionName, fieldName], [singleArrayItem]);
                }
            }
        }
    }

    return newFormData;
}


export function getSchemaPath(schema: RJSFSchema): string[] {
    return schema['$_schemaPath'] ?? [];
}

export function getIsHidden(schema: RJSFSchema): boolean {
    return schema['$isHidden'] ?? false;
}

export const validator: ValidatorType = {
    validateFormData(formData, schema) {
        return {
            errors: [],
            errorSchema: {}
        };
    },
    isValid(schema, formData, rootSchema) {
        return true;
    },
    toErrorList(errorSchema, fieldPath) {
        return [];
    },
    rawValidation(schema, formData) {
        return {
            errors: []
        }
    }
};

function annotateSchemaPath<T extends FormFieldObjectSpec>(spec: T, objectPath: string[]): T & { '$_schemaPath': string[] } {
    const properties = _mapValues(spec.properties, (fieldSpec, fieldName) => {
        const fieldPath = [...objectPath, fieldName];

        let newFieldSpec = fieldSpec;
        if (fieldSpec.type == 'array' && fieldSpec.items.type == 'object') {
            newFieldSpec = {
                ...fieldSpec,
                items: annotateSchemaPath(fieldSpec.items, fieldPath)
            };
        }

        return {
            ...newFieldSpec,
            ['$_schemaPath']: fieldPath
        }
    });

    return {
        ...spec,
        properties,
        ['$_schemaPath']: objectPath
    };
}

function removeFieldIfHidden(spec: FormFieldSpec): FormFieldSpec | undefined {
    return spec.$isHidden ? undefined : spec;
}

