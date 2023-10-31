import { AssertionError } from "assert";

export function assertDefined<T>(value: T | null | undefined): T {
  if (value === null) {
    throw new AssertionError({ message: "Expected value to be not null" });
  } else if (value === undefined) {
    throw new AssertionError({ message: "Expected value to be not undefined" });
  }
  return value;
}

export function assertEqual<V1, V2>(v1: V1, v2: V2) {
  if ((v1 as any) != (v2 as any)) {
    throw new AssertionError({
      message: `Expected values to be equal: ${v1}, ${v2}`,
    });
  }

  return v1;
}

export function assertArrayItems<T>(
  values: T[] | null | undefined,
  length: number
): T[] {
  const valuesDefined = assertDefined(values);

  if (valuesDefined.length < length) {
    throw new AssertionError({
      message: `Expected values to be have length at least ${length}`,
    });
  }

  return valuesDefined;
}

export function assertString(value: any): string {
  if (typeof value == "string") {
    return value;
  }
  throw new AssertionError({ message: "Expected value to be string" });
}

export function assertNumber(value: any): number {
  if (typeof value == "number") {
    return value;
  }
  throw new AssertionError({ message: "Expected value to be number" });
}
