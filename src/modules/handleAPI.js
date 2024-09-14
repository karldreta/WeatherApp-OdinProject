import { format } from 'date-fns';

export async function fetchLocation(e) {
    e.preventDefault();

    const dateToday = format(new Date(), "yyyy-MM-dd");
    const locationValue = document.querySelector("#inputLocation").value;
    console.log(locationValue);
    const fetchWeatherReport = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationValue}/${dateToday}?key=3BZCY9DLAUZ38XRC8GGN95VYW`)
    const weatherReport = await fetchWeatherReport.json();
    console.log(weatherReport);
}