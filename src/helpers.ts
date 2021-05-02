import { invoker, assoc, dissoc, sortBy, prop, pipe } from "ramda";

export const insertOrder = (acc, [price, size]) => {
  return size === 0 ? dissoc(price, acc) : assoc(price, size, acc);
};

export const sortByPrice = sortBy(prop("0"));

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
  )(value);
