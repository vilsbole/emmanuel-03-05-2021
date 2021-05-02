import { financial } from "./financial";

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
