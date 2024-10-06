const container = document.getElementById("container");

const locations = [
  {
    name: "Tokyo, Japan",
    latitude: 35.6895,
    longitude: 139.6917,
    timezone: "Asia/Tokyo",
  },
  {
    name: "New York, USA",
    latitude: 40.7128,
    longitude: -74.006,
    timezone: "America/New_York",
  },
  {
    name: "Oslo, Norway",
    latitude: 59.9139,
    longitude: 10.7522,
    timezone: "Europe/Oslo",
  },
  {
    name: "London, UK",
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
  },
  {
    name: "Paris, France",
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: "Europe/Paris",
  },
];

const updateTime = 1000 * 60 * 10; // 10 minutes

let weatherData = [];

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&timezone=${location.timezone}`
    );
    const data = await response.json();
    weatherData.push({
      city: location.name,
      current_weather: data.current_weather,
    });
  } catch (error) {
    console.error(error);
  }
}

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function updateWeather() {
  weatherData.forEach((weather) => {
    weather.current_weather.time = formatDateTime(weather.current_weather.time);
    const div = document.createElement("div");
    div.classList.add("weather-container");
    div.innerHTML = `
      <h1 class="weather-city">${weather.city}</h1>
      <p class="weather-time">${weather.current_weather.time}</p>
      <p class="weather-temperature">${weather.current_weather.temperature}°C</p>
      <p class="weather-windspeed">Windspeed: ${weather.current_weather.windspeed} km/h</p>
    `;
    container.appendChild(div);
  });
}

async function fetchAndDisplayWeather() {
  for (const location of locations) {
    await getWeather(location);
  }
  updateWeather();
}

fetchAndDisplayWeather();

setInterval(setInterval(updateWeatherData, updateTime));
