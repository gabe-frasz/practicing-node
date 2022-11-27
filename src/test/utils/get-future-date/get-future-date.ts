import { parseISO, setYear } from "date-fns";

/*
 * Receives "2022-11-26" and returns "2023-11-26"
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
