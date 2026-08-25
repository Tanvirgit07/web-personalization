import { describe, expect, it } from "vitest";
import { getTimePeriod } from "../src/time/time-engine.js";

describe("Time Engine", () => {
  it("should return morning", () => {
    const date = new Date(2026, 7, 25, 8, 0);

    expect(getTimePeriod(date)).toBe("morning");
  });

  it("should return afternoon", () => {
    const date = new Date(2026, 7, 25, 13, 0);

    expect(getTimePeriod(date)).toBe("afternoon");
  });

  it("should return evening", () => {
    const date = new Date(2026, 7, 25, 18, 0);

    expect(getTimePeriod(date)).toBe("evening");
  });

  it("should return night", () => {
    const date = new Date(2026, 7, 25, 23, 0);

    expect(getTimePeriod(date)).toBe("night");
  });

  it("should return night at 4:59", () => {
    const date = new Date(2026, 7, 25, 4, 59);

    expect(getTimePeriod(date)).toBe("night");
  });

  it("should return morning at exactly 5:00", () => {
    const date = new Date(2026, 7, 25, 5, 0);

    expect(getTimePeriod(date)).toBe("morning");
  });

  it("should return afternoon at exactly 12:00", () => {
    const date = new Date(2026, 7, 25, 12, 0);

    expect(getTimePeriod(date)).toBe("afternoon");
  });

  it("should return evening at exactly 17:00", () => {
    const date = new Date(2026, 7, 25, 17, 0);

    expect(getTimePeriod(date)).toBe("evening");
  });

  it("should return night at exactly 21:00", () => {
    const date = new Date(2026, 7, 25, 21, 0);

    expect(getTimePeriod(date)).toBe("night");
  });

  it("should return night at midnight", () => {
    const date = new Date(2026, 7, 25, 0, 0);

    expect(getTimePeriod(date)).toBe("night");
  });
});