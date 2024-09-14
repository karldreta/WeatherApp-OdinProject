import { format, endOfWeek } from "date-fns";

export async function fetchLocation(e) {
  e.preventDefault();

  const dateToday = format(new Date(), "yyyy-MM-dd");
  const dateEnd = format(endOfWeek(dateToday), "yyyy-MM-dd");
  const locationValue = document.querySelector("#inputLocation").value;
  const fetchWeatherReport = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationValue}/${dateToday}/${dateEnd}?key=3BZCY9DLAUZ38XRC8GGN95VYW`,
  );
  const weatherReport = await fetchWeatherReport.json();

  // Isolate the values we need
  const currentWeek = weatherReport.days;
  const timezone = weatherReport.timezone;
  const address = weatherReport.resolvedAddress;
  const descriptionWeek = weatherReport.description;
  const tempWeek = weatherReport.currentConditions.temp;

  return { currentWeek, descriptionWeek, tempWeek, timezone, address };
}
