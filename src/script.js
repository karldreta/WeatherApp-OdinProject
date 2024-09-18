import "./styles.css";
import { format, addDays, eachDayOfInterval } from "date-fns";
import { fetchLocation } from "./modules/handleAPI";

document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("form").addEventListener("submit", displayToDOM);

  // We'll grab the dates first so we can change the textContents of each day button as soon as DOM loads.
  const dateToday = format(new Date(), "yyyy-MM-dd");
  const dateEnd = format(addDays(dateToday, 6), "yyyy-MM-dd"); // We'll just need to add the days (6) from today.

  const weekNow = eachDayOfInterval({
    start: dateToday,
    end: dateEnd,
  });
  const formattedWeekNow = weekNow.map((day) => format(day, "E"));
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button, index) => {
    if (index <= formattedWeekNow.length) {
      button.textContent = formattedWeekNow[index];
    }
  });

  async function displayToDOM(e) {
    // Then, we'll pass in the dates to only fetch the ones we need
    const locationDetails = await fetchLocation(e, dateToday, dateEnd);
    // console.log(locationDetails);
    const toConvert = document.querySelector(".span.temp");
    toConvert.textContent = `${locationDetails.tempWeek}°F`;
    toConvert.addEventListener("click", convertDegree);
    toConvert.style.border = "1px solid black";

    // Render to DOM, we don't need to store the variables below since we'll just  use it immediately and once.
    document.querySelector(".span.description").textContent =
      locationDetails.descriptionWeek;
    document.querySelector(".span.address").textContent =
      locationDetails.address;
      document.querySelector(".span.timezone").textContent =
      locationDetails.timezone;

    return locationDetails.currentWeek;
  }

  function convertDegree(e) {
    let degree = e.target.textContent;
    if (degree.endsWith("F")) {
      const degreeF = parseInt(degree.slice(0, degree.indexOf("F")));
      const degreeC = Math.round((5 / 9) * (degreeF - 32));
      e.target.textContent = `${degreeC}°C`;
    } else if (degree.endsWith("C")) {
      const degreeC = parseInt(degree.slice(0, degree.indexOf("C")));
      const degreeF = Math.round(degreeC * (9 / 5) + 32);
      e.target.textContent = `${degreeF}°F`;
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => displayDay(index));
  });
  async function displayDay(index) {
    console.log(index);
    const currentWeek = await displayToDOM(e); // This will be an array of the current week, we will still need to isolate each day.
    console.log(currentWeek[index]);
  }
});
