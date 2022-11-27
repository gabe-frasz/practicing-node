import { getFutureDate } from "@/test";
import { describe, expect, it } from "vitest";
import { Appointment } from "./appointment";

describe("Appointment", () => {
  it("should create an appointment", () => {
    const startsAt = getFutureDate("2022-11-26");
    const endsAt = getFutureDate("2022-11-27");

    const TestAppoitment = new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(TestAppoitment).toBeInstanceOf(Appointment);
    expect(TestAppoitment.customer).toBe("John Doe");
  });

  it("shouldn't create an appointment with an end date before the start date", () => {
    const createInvalidAppointment = () => {
      const startsAt = getFutureDate("2022-11-26");
      const endsAt = getFutureDate("2022-11-25");

      return new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt,
      });
    };

    expect(createInvalidAppointment).toThrow();
  });

  it("shouldn't create an appointment with start date before now", () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);

    const sut = () => {
      return new Appointment({
        customer: "John Doe",
        startsAt,
        endsAt,
      });
    };

    expect(sut).toThrow();
  });
});
