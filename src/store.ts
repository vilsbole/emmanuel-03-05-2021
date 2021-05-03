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
  subtract,
  reverse,
  compose,
  last,
  head,
} from "ramda";
import { insertOrder } from "./helpers";
import { createSelector, AnyAction } from "@reduxjs/toolkit";

export interface AppState {
  asks: Record<string, number>;
  bids: Record<string, number>;
}
export type LimitOrder = [number, number];
export type Order = [string, number, number];
type AppendTotal = (o: LimitOrder[]) => Order[];
type SelectSorted = (s: AppState) => Order[];

export const initialState = { asks: {}, bids: {} };

export const reducer = (state: AppState, action: AnyAction) => {
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
    case "reset":
    default:
      return state;
  }
};

export const resetState = () => ({
  type: "reset",
});
export const updateAsks = (asks: LimitOrder[]) => ({
  type: "addAsks",
  payload: asks,
});
export const updateBids = (bids: LimitOrder[]) => ({
  type: "addBids",
  payload: bids,
});

const selectAsks = ({ asks }: AppState) => asks;
const selectBids = ({ bids }: AppState) => bids;

const mapIndexed = addIndex(map);

export const getSpread = ({
  asks,
  bids,
}: {
  asks: Order[];
  bids: Order[];
}): number =>
  subtract(
    compose(Number.parseFloat, head, last)(asks),
    compose(Number.parseFloat, head, head)(bids)
  );

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
