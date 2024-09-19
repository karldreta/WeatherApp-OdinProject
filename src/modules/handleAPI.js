export async function fetchLocation(e, dateToday, dateEnd) {
  e.preventDefault();

  const locationValue = document.querySelector("#inputLocation").value;

  try {
    const fetchWeatherReport = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationValue}/${dateToday}/${dateEnd}?key=3BZCY9DLAUZ38XRC8GGN95VYW`,
    );
    const weatherReport = await fetchWeatherReport.json();
    // Isolate the values we need
    const currentWeek = weatherReport.days;
    const timezone = weatherReport.timezone;
    const address = weatherReport.resolvedAddress;
    const descriptionWeek = weatherReport.description;
    const tempWeek = Math.round(weatherReport.currentConditions.temp);

    return { currentWeek, descriptionWeek, tempWeek, timezone, address };
  } catch (error) {
    const alertModal = document.querySelector("dialog.alert");
    alertModal.showModal();
    document.querySelector(".closeModal").addEventListener("click", () => {
      alertModal.close();
    });
  }
}
