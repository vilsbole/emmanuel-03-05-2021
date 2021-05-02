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
import { insertOrder, sortByPrice } from "./helpers";
import { createSelector } from "@reduxjs/toolkit";

export const initialState = { asks: {}, bids: {} };

export const reducer = (state = initialState, action = { type: "init" }) => {
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

export const updateAsks = (asks) => ({ type: "addAsks", payload: asks });
export const updateBids = (bids) => ({ type: "addBids", payload: bids });

const selectAsks = ({ asks }) => asks;
const selectBids = ({ bids }) => bids;

const mapIndexed = addIndex(map);
export const appendTotal = (list) =>
  mapIndexed(([price, size], idx) => {
    return [
      price,
      size,
      pipe(
        slice(idx, list.length),
        reduce((acc, [p, s]) => add(acc, s), 0)
      )(list),
    ];
  })(list);

export const selectSortedAsks = createSelector(
  [selectAsks],
  pipe(toPairs, sort(ascend(prop("0"))), take(15), reverse, appendTotal)
);

export const selectSortedBids = createSelector(
  [selectBids],
  pipe(
    toPairs,
    sort(descend(prop("0"))),
    take(15),
    reverse,
    appendTotal,
    reverse
  )
);
