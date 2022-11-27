import { describe, expect, it } from "vitest";
import { getFutureDate } from "./get-future-date";

describe("getFutureDate", () => {
  it("should increase year by one", () => {
    const year = new Date().getFullYear();

    expect(getFutureDate(`${year}-11-26`).getFullYear()).toBe(year + 1);
  });
});
