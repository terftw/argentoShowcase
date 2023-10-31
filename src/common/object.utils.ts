import _pickBy from 'lodash/pickBy';

import { isDefined } from './parse.utils';

export function setObjectProp<T>(obj: object, name: string, value: T) {
    (obj as any)[name] = value;
}

export function filterDefinedValues<T>(obj: { [key: string]: T | null | undefined }): { [key: string]: T } {
    return _pickBy(obj, (x) => isDefined(x)) as { [key: string]: T };
}

export function flattenObject(obj: object, prefix = '') {
    const flattened: { [key: string]: any } = {};

    for (const key in obj) {
        const newPrefix = prefix ? `${prefix}.${key}` : key
        const value = (obj as any)[key];

        if (isDefined(value) && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(flattened, flattenObject(value, newPrefix));
        } else {
            flattened[newPrefix] = value;
        }
    }

    return flattened;
}

export function unflattenObject(obj: { [key: string]: any }) {
    const unflattened: { [key: string]: any } = {};

    for (const key in obj) {
        const parts = key.split(".");
        let target = unflattened;

        for (let i = 0; i < parts.length; i++) {
            if (i === parts.length - 1) {
                target[parts[i]] = obj[key];
            } else {
                if (!Object.prototype.hasOwnProperty.call(target, parts[i])) {
                    target[parts[i]] = {};
                }
                target = target[parts[i]];
            }
        }
    }

    return unflattened;
}