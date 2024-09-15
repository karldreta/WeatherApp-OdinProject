import "./styles.css";
import { format, endOfWeek, eachDayOfInterval } from "date-fns";
import { fetchLocation } from "./modules/handleAPI";

document.addEventListener("DOMContentLoaded", (e) => {
  document.querySelector("form").addEventListener("submit", displayToDOM);

    // We'll grab the dates first so we can change the textContents of each day button as soon as DOM loads.
  const dateToday = format(new Date(), "yyyy-MM-dd");
  const dateEnd = format(endOfWeek(dateToday), "yyyy-MM-dd");
  const weekNow = eachDayOfInterval({
    start: dateToday,
    end: dateEnd,
  });
  const formattedWeekNow = weekNow.map(day => format(day, 'E'));
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button, index) => {
    if (index <= formattedWeekNow.length) {
      button.textContent = formattedWeekNow[index];
    }
  });

  async function displayToDOM(e) {
    // We'll pass in the dates to only fetch the ones we need
    const locationDetails = await fetchLocation(e, dateToday, dateEnd);
    console.log(locationDetails);
    console.log(locationDetails.currentWeek[0].temp);
  }
});
