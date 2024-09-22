import "./styles.css";
import { format, addDays, eachDayOfInterval, parse } from "date-fns";
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

    // Render to DOM, we don't need to store the variables below since we'll just  use it immediately and once.
    document.querySelector(".span.description").textContent =
      `"${locationDetails.descriptionWeek}"`;
    document.querySelector(".span.address").textContent =
      locationDetails.address;
    document.querySelector(".span.timezone").textContent =
      locationDetails.timezone;

    // We'll don't want to return the array, since the displayDay is dependent on this function, we would have to chain the second function from here.
    //  Else the buttons can start calling the function without adding location at the initial load.
    buttons.forEach((button, index) => {
      // Use a regular function to capture `this`
      button.addEventListener("click", function (e) {
        displayDay(locationDetails.currentWeek, index, this);
      });
    });
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

  async function displayDay(currentWeek, index, buttonElement) {
    // We'll style the buttons with class = "active"
    document.querySelectorAll("button").forEach((button) => {
      button.classList.remove("active");
    });
    buttonElement.classList.add("active");
    document.querySelector("#dayInfoPanel").style.display = "grid";
    const Week = currentWeek; // This will be an array of the current week, we will still need to isolate each day.
    const todayDetails = Week[index];
    const toConvert = document.querySelector(".span.todayTemp");
    toConvert.textContent = `${Math.round(todayDetails.temp)}°F`;
    toConvert.addEventListener("click", convertDegree);

    document.querySelector(".span.todayDate").textContent = format(
      todayDetails.datetime,
      "d MMM, yyyy",
    );
    document.querySelector(".span.todayDesc").textContent =
      `"${todayDetails.description}"`;
    document.querySelector(".span.todayCond").textContent =
      todayDetails.conditions;
    document.querySelector(".span.todaySunset").textContent = format(
      parse(todayDetails.sunset, "HH:mm:ss", new Date()),
      "h:m a",
    );
    document.querySelector(".span.todayHum").textContent =
      todayDetails.humidity;
  }
});
