import { config } from "dotenv";
config();

async function getWeather() {
  const apiKey = process.env.API_KEY;
  console.log(apiKey);

  if (!apiKey) {
    throw new Error("API key not found");
  }
  const location = document.getElementById("location").value;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  try {
    const response = await fetch(
      `${url}${encodeURIComponent(location)}&appid=${apiKey}`,
    );
    const data = await response.json();
    document.getElementById("weather condition").textContent =
      data.weather[0].description;
  } catch (error) {
    document.getElementById("weather condition").textContent =
      "Error fetching weather data";
  }
}
