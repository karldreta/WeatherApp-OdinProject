import "./styles.css";
import { fetchLocation } from "./modules/handleAPI";

document.querySelector("form").addEventListener("submit", displayToDOM);


async function displayToDOM(e) {
    const locationDetails = await fetchLocation(e);
    console.log(locationDetails);
    console.log(locationDetails.currentWeek[0].temp);
}