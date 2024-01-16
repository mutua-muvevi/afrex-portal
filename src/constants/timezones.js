import { getAllTimezones, utcToZonedTime } from "date-fns-tz";

// Get all time zones
const Timezones = getAllTimezones().map((name) => ({
  name,
  label: `(UTC${
    utcToZonedTime(new Date(), "UTC")
      .toUTCString()
      .match(/([+-]\d{2}:\d{2})/)[1]
  }) ${name}`,
}));

export default Timezones;

