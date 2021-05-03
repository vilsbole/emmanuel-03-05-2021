import { fAsks, fBids, fBidsOrders, fAsksOrders, fAppState } from "../fixtures";
import {
  reducer,
  updateAsks,
  updateBids,
  initialState,
  selectSortedAsks,
  selectSortedBids,
  appendTotal,
  getSpread,
} from "./store";

describe("Store", () => {
  test("reducer returns initialState", () => {
    const actual = reducer(initialState, { type: "foo" });
    expect(actual).toEqual(initialState);
  });

  test("updateAsks() appends asks to state", () => {
    const actual = reducer(initialState, updateAsks(fAsks));
    const expected = { ...initialState, asks: fAppState.asks };
    expect(actual).toEqual(expected);
  });

  test("updateBids() appends bids to state", () => {
    const actual = reducer(initialState, updateBids(fBids));
    const expected = { ...initialState, bids: fAppState.bids };
    expect(actual).toEqual(expected);
  });

  test("selectSortedAsks()", () => {
    const state = reducer(initialState, updateAsks(fAsks));
    const actual = selectSortedAsks(state);
    const expected = fAsksOrders;
    expect(actual).toEqual(expected);
  });

  test("selectSortedBids()", () => {
    const state = reducer(initialState, updateBids(fBids));
    const actual = selectSortedBids(state);
    const expected = fBidsOrders;
    expect(actual).toEqual(expected);
  });

  test("appendTotal()", () => {
    const actual = appendTotal([
      [1, 20],
      [2, 30],
      [3, 40],
    ]);
    const expected = [
      [1, 20, 90],
      [2, 30, 70],
      [3, 40, 40],
    ];
    expect(actual).toEqual(expected);
  });

  test("getSpread(): caculates spread", () => {
    const actual = getSpread({ asks: fAsksOrders, bids: fBidsOrders });
    const expected =
      Number.parseFloat(fAsksOrders[fAsksOrders.length - 1][0]) -
      Number.parseFloat(fBidsOrders[0][0]);
    expect(actual).toEqual(expected);
  });
});
