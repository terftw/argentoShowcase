export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

export function parseBoolean(value: any): boolean | undefined {
    if (typeof value == 'boolean') {
        return value
    } else if (isDefined(value)) {
        return !!value;
    } else {
        return undefined;
    }
}

export function parseNumber(value: any): number | undefined {
    if (typeof value == 'string') {
        const floatValue = parseFloat(value);
        return isNaN(floatValue) ? undefined : floatValue;
    } else if (typeof value == 'number') {
        return value;
    } else {
        return undefined;
    }
}

export function parseAsObjectType<T extends object = object, V = any>(value: V, parse?: (value: object) => object): T | undefined {
    if (typeof value == 'object') {
        return (parse ? parse(value as object) : value) as T;
    }

    return undefined;
}
