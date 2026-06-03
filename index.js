//const apiKey = env.API_KEY;
const apiKey = "";

const url = "https://api.openweathermap.org/data/2.5/weather?q=";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    onSearchCity();
  });
});

function onSearchCity() {
  const city = document.getElementById("citySearch").value;
  //console.log(city);
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
    document.getElementById("temperature").textContent = data.main.temp;
    document.getElementById("weatherCondition").textContent =
      data.weather[0].description;
  } catch (error) {
    document.getElementById("weatherCondition").textContent =
      "Error fetching weather data";
  }
}
