import { fAsks, fBids, fStore } from "../fixtures";
import {
  reducer,
  updateAsks,
  updateBids,
  initialState,
  selectSortedAsks,
  selectSortedBids,
  appendTotal,
} from "./store";

describe("Store", () => {
  test("reducer has an initialState", () => {
    const actual = reducer();
    expect(actual).toEqual(initialState);
  });

  test("updateAsks() appends asks to state", () => {
    const actual = reducer(initialState, updateAsks(fAsks));
    const expected = { ...initialState, asks: fStore.asks };
    expect(actual).toEqual(expected);
  });

  test("updateBids() appends bids to state", () => {
    const actual = reducer(initialState, updateBids(fBids));
    const expected = { ...initialState, bids: fStore.bids };
    expect(actual).toEqual(expected);
  });

  test("selectSortedAsks()", () => {
    const state = reducer(initialState, updateAsks(fAsks));
    const actual = selectSortedAsks(state);
    const expected = fAsks;
    expect(actual).toEqual(expected);
  });

  test("selectSortedBids()", () => {
    const state = reducer(initialState, updateBids(fBids));
    const actual = selectSortedBids(state);
    const expected = fBids;
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
});
