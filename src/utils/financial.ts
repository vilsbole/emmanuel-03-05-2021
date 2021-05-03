import { pipe, invoker } from "ramda";

export const financial = (
  value: number | string,
  options = { fractionDigits: 2 }
): string =>
  pipe(
    Number.parseFloat,
    invoker(1, "toFixed")(2),
    Intl.NumberFormat("en", {
      minimumFractionDigits: options.fractionDigits,
    }).format
  )(value as string); // NOTE: parseFloat can handle numbers.
