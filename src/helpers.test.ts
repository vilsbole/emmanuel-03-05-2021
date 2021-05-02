import { dissoc } from "ramda";
import { insertOrder, financial } from "./helpers";

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

describe("financial()", () => {
  it("displays with thousands grouping", () => {
    expect(financial("3440")).toEqual("3,440.00");
  });
  it("displays two fraction digits", () => {
    expect(financial("344")).toEqual("344.00");
    expect(financial(344.05)).toEqual("344.05");
  });
  it("options can remove fraction digits", () => {
    expect(financial("35444.00", { fractionDigits: 0 })).toEqual("35,444");
  });
});
