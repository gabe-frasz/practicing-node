import { Appointment } from "@/entities";
import { InMemoryAppointmentsRepository } from "@/repositories";
import { describe, expect, it } from "vitest";
import { getFutureDate } from "../../test/utils";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment Use-Case", () => {
  it("should create an appointment", () => {
    // sut => system under test
    const repository = new InMemoryAppointmentsRepository();
    const sut = new CreateAppointment(repository);

    const startsAt = getFutureDate("2022-11-26");
    const endsAt = getFutureDate("2022-11-27");

    expect(
      sut.run({ customer: "John Doe", startsAt, endsAt })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("shouldn't create an appointment with overlapping dates", async () => {
    const createAppointment = new CreateAppointment(
      new InMemoryAppointmentsRepository()
    );

    await createAppointment.run({
      customer: "John Doe",
      startsAt: getFutureDate("2022-12-26"),
      endsAt: getFutureDate("2022-12-31"),
    });

    expect(
      createAppointment.run({
        customer: "John Doe",
        startsAt: getFutureDate("2022-12-27"),
        endsAt: getFutureDate("2023-01-01"),
      })
    ).rejects.toThrow();

    expect(
      createAppointment.run({
        customer: "John Doe",
        startsAt: getFutureDate("2022-12-25"),
        endsAt: getFutureDate("2022-12-29"),
      })
    ).rejects.toThrow();

    expect(
      createAppointment.run({
        customer: "John Doe",
        startsAt: getFutureDate("2022-12-27"),
        endsAt: getFutureDate("2022-12-29"),
      })
    ).rejects.toThrow();
  });
});
