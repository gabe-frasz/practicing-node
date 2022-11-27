import { Appointment } from "@/entities";
import { AppointmentsRepository } from "../../repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async run({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("There is an overlapping appointment");
    }

    const appointment = new Appointment({ customer, startsAt, endsAt });
    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
