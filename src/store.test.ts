import { fAsks, fBids } from "../fixtures";
import {
  reducer,
  updateAsks,
  updateBids,
  initialState,
  selectAsks,
  selectBids,
} from "./store";

describe("Store", () => {
  test("reducer has an initialState", () => {
    const actual = reducer();
    expect(actual).toEqual(initialState);
  });

  test("updateAsks() appends asks to state", () => {
    const actual = reducer(initialState, updateAsks(fAsks));
    const expected = { ...initialState, asks: [...fAsks] };
    expect(actual).toEqual(expected);
  });

  test("updateBids() appends bids to state", () => {
    const actual = reducer(initialState, updateBids(fBids));
    const expected = { ...initialState, bids: [...fBids] };
    expect(actual).toEqual(expected);
  });

  test("selectAsks()", () => {
    const state = reducer(initialState, updateAsks(fAsks));
    const actual = selectAsks(state);
    const expected = fAsks;
    expect(actual).toEqual(expected);
  });

  test("selectBids()", () => {
    const state = reducer(initialState, updateBids(fBids));
    const actual = selectBids(state);
    const expected = fBids;
    expect(actual).toEqual(expected);
  });
});
