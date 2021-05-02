import { dissoc } from "ramda";
import { insertOrder } from "./helpers";

describe("insertOrder()", () => {
  it("appends entry to object from tuple", () => {
    const target = [57435.0, 15020.0];
    const actual = insertOrder({}, target);
    const expected = { [target[0]]: target[1] };
    expect(actual).toEqual(expected);
  });

  it("replaces value if key exists", () => {
    const acc = { 57435.5: 15020.0 };
    const target = [57435.5, 20.0];
    const actual = insertOrder(acc, target);
    const expected = { [`${target[0]}`]: target[1] };
    expect(actual).toEqual(expected);
  });

  it("removes price if size is zero", () => {
    const acc = { 57435.0: 20, 57435.5: 30 };
    const target = [57435.0, 0];
    const actual = insertOrder(acc, target);
    const expected = dissoc(`${target[0]}`, acc);
    expect(actual).toEqual(expected);
  });
});

describe("sortByPrice()", () => {});
