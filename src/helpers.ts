import { assoc, dissoc, sortBy, prop } from "ramda";

export const insertOrder = (acc, [price, size]) => {
  return size === 0 ? dissoc(price, acc) : assoc(price, size, acc);
};

export const sortByPrice = sortBy(prop("0"));
