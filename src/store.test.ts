import {
  reducer,
  updateAsks,
  updateBids,
  initialState,
  selectAsks,
  selectBids,
} from "./store";

const fAsks = [
  [57438.0, 230690.0],
  [57435.0, 15020.0],
  [57434.5, 1915.0],
  [57428.0, 11470.0],
  [57425.0, 9330.0],
  [57424.5, 4523.0],
  [57420.5, 15000.0],
  [57419.0, 51000.0],
  [57414.5, 75313.0],
  [57414.0, 28707.0],
  [57412.5, 6351.0],
  [57412.0, 14922.0],
  [57411.5, 3017.0],
  [57409.5, 6714.0],
  [57409.0, 150.0],
  [57408.5, 369627.0],
  [57406.5, 6556.0],
  [57406.0, 3062.0],
  [57401.0, 6601.0],
  [57400.5, 1940.0],
  [57399.5, 13387.0],
  [57396.5, 112724.0],
];
const fBids = [
  [57369.5, 42442],
  [57376, 0],
  [57377, 31980],
  [57384, 0],
  [57391.5, 0],
  [57400.5, 0],
  [57406, 3062],
  [57409.5, 13565],
  [57412.5, 64173],
];

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
