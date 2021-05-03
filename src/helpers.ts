import { assoc, dissoc } from "ramda";
import type { LimitOrder } from "./store";

export const insertOrder = (
  acc: Record<string, number>,
  [price, size]: LimitOrder
) => {
  return size === 0 ? dissoc(`${price}`, acc) : assoc(`${price}`, size, acc);
};
