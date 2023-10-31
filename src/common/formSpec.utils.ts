import { fail } from 'assert';
import _without from 'lodash/without';

import { assertArrayItems, assertDefined } from "./assert.utils";
import { FormFieldObjectSpec, FormSpec } from "./formSpec";

export function modifyFormSpecIsRequired(spec: FormSpec, fieldSchemaPath: string[], isRequired: boolean): FormSpec {
    const [sectionName] = assertArrayItems(fieldSchemaPath, 1);
    const section = assertDefined(spec.properties[sectionName]);
    return {
        ...spec,
        properties: {
            ...spec.properties,
            [sectionName]: modifyFormFieldObjectSpec(section, fieldSchemaPath.slice(1), (spec, fieldName) => {
                const newRequired = updateRequiredFields(spec.required ?? [], isRequired ? [] : [fieldName], isRequired ? [fieldName] : []);
                return {
                    ...spec,
                    required: newRequired
                }
            })
        }
    };
}

export function modifyFormSpecIsHidden(spec: FormSpec, fieldSchemaPath: string[], isHidden: boolean) {
    const [sectionName] = assertArrayItems(fieldSchemaPath, 1);
    const section = assertDefined(spec.properties[sectionName]);
    return {
        ...spec,
        properties: {
            ...spec.properties,
            [sectionName]: modifyFormFieldObjectSpec(section, fieldSchemaPath.slice(1), (spec, fieldName) => {
                const fieldSpec = assertDefined(spec.properties[fieldName]);
                return {
                    ...spec,
                    properties: {
                        ...spec.properties,
                        [fieldName]: {
                            ...fieldSpec,
                            '$isHidden': isHidden ? true : undefined
                        }
                    }
                }
            })
        }
    };
}

function modifyFormFieldObjectSpec<T extends FormFieldObjectSpec>(spec: T, fieldSchemaPath: string[], modify: (spec: FormFieldObjectSpec, fieldName: string) => FormFieldObjectSpec): T {
    const [fieldName] = assertArrayItems(fieldSchemaPath, 1);

    // For object arrays, recursively modify
    if (fieldSchemaPath.length > 1) {
        const fieldSpec = assertDefined(spec.properties[fieldName]);
        if (fieldSpec.type !== 'array') fail();
        if (fieldSpec.items.type !== 'object') fail();
        const fieldItemsSpec = modifyFormFieldObjectSpec(fieldSpec.items, fieldSchemaPath.slice(1), modify);
        return {
            ...spec,
            properties: {
                ...spec.properties,
                [fieldName]: {
                    ...fieldSpec,
                    items: fieldItemsSpec
                }
            }
        };
    }

    return {
        ...spec,
        ...modify(spec, fieldName)
    };
}


function updateRequiredFields(required: string[], toRemove: string[], toAdd: string[]) {
    let newRequired = required;
    newRequired = _without(newRequired, ...toRemove);
    for (const x of toAdd) {
        if (!newRequired.includes(x)) newRequired.push(x);
    }
    return newRequired;
}