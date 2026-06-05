//api key is in .env file
const apiKey = import.meta.env.VITE_API_KEY;

//this part of the url is the same for all requests
const url = "https://api.openweathermap.org/data/2.5/weather?q=";

/* Waits for the entire page to load, then find the search form.
  Every time the form is submitted, don't reload the page, instead run onSearchCity.*/
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    onSearchCity();
  });
});

function onSearchCity() {
  const city = document.getElementById("citySearch").value;
  document.getElementById("citySearch").value = "";
  document.getElementById("location").textContent = `${city.toUpperCase()}`;
  getWeather(city);
}

async function getWeather(city) {
  if (!apiKey) {
    throw new Error("API key not found");
  }

  try {
    const response = await fetch(
      `${url}${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("weatherCondition").textContent =
      data.weather[0].description;
  } catch (error) {
    document.getElementById("weatherCondition").textContent =
      "Error fetching weather data";
  }
}
