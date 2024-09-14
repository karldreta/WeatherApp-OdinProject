import "./styles.css";
import { format } from "date-fns";
import { fetchLocation } from "./modules/handleAPI";

document.addEventListener("DOMContentLoaded", e => {
    document.querySelector("form").addEventListener("submit", displayToDOM);
    async function displayToDOM(e) {
        const locationDetails = await fetchLocation(e);
        console.log(locationDetails);
        console.log(locationDetails.currentWeek[0].temp);
    
        const daysOfWeek = convertDateToName(locationDetails.currentWeek);
        console.log(daysOfWeek);
        const buttons = document.querySelectorAll(".button");
        buttons.forEach((button, index) => {
            if (index <= daysOfWeek.length) { 
                button.textContent = daysOfWeek[index];
            }
        });
        
    }
    
    function convertDateToName(dates) {
        const nameOfDays = [];
        dates.forEach(day => {
            nameOfDays.push(format(day.datetime, "E"));
        });
        return nameOfDays;
    }
})



// 0 : {datetime: '2024-09-15', datetimeEpoch: 1726329600, tempmax: 85.7, tempmin: 76.2, temp: 80.5, …}
