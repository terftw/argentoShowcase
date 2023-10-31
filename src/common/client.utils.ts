export const parseWorkingTowardsMarriageValue = (val?: string): string => {
  return val === "1" ? "Yes" : "No";
};

export const prettifyFormValue = (val: string): string => {
  return val
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const parseFormValues = (
  val?: string | string[]
): string | undefined => {
  if (!val) return undefined;

  if (Array.isArray(val)) {
    return val.map((value) => prettifyFormValue(value)).join(", ");
  }

  return prettifyFormValue(val);
};
