import {
  ascend,
  descend,
  prop,
  reduce,
  take,
  sort,
  pipe,
  toPairs,
  addIndex,
  map,
  add,
  slice,
  reverse,
} from "ramda";
import { insertOrder } from "./helpers";
import { createSelector, AnyAction } from "@reduxjs/toolkit";

interface Store {
  asks: Record<string, number>;
  bids: Record<string, number>;
}
export type LimitOrder = [number, number];
export type Order = [string, number, number];
type AppendTotal = (o: LimitOrder[]) => Order[];
type SelectSorted = (s: Store) => Order[];

export const initialState = { asks: {}, bids: {} };

export const reducer = (
  state = initialState,
  action: AnyAction = { type: "init" }
) => {
  switch (action.type) {
    case "addAsks": {
      return {
        bids: state.bids,
        asks: reduce(insertOrder, state.asks, action.payload),
      };
    }
    case "addBids": {
      return {
        asks: state.asks,
        bids: reduce(insertOrder, state.bids, action.payload),
      };
    }
    default:
      return state;
  }
};

export const updateAsks = (asks: LimitOrder[]) => ({
  type: "addAsks",
  payload: asks,
});
export const updateBids = (bids: LimitOrder[]) => ({
  type: "addBids",
  payload: bids,
});

const selectAsks = ({ asks }: Store) => asks;
const selectBids = ({ bids }: Store) => bids;

const mapIndexed = addIndex(map);

export const appendTotal: AppendTotal = (orders) =>
  // @ts-expect-error: ts struggles with ramda
  mapIndexed(([price, size], idx) => {
    return [
      price,
      size,
      pipe(
        slice(idx, orders.length),
        reduce((acc, [p, s]) => add(acc, s), 0)
      )(orders),
    ];
  }, orders);

export const selectSortedAsks: SelectSorted = createSelector(
  [selectAsks],
  pipe(
    toPairs,
    sort(ascend(prop("0"))),
    // @ts-expect-error: ts struggles with ramda
    take(15),
    reverse,
    appendTotal
  )
);

export const selectSortedBids: SelectSorted = createSelector(
  [selectBids],
  pipe(
    toPairs,
    sort(descend(prop("0"))),
    // @ts-expect-error: ts struggles with ramda
    take(15),
    reverse,
    appendTotal,
    (l) => reverse<Order>(l)
  )
);
