const apiKey = "cba4f5059ce0fa467c7920563ad41589";

const weatherDataEl = document.querySelector(".weather-data");

const cityInputEl = document.querySelector(".city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityValue = cityInputEl.value.trim();

  if (cityValue === "") {
    weatherDataEl.querySelector(".description").textContent =
      "Please enter a valid city name";
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".details").innerHTML = "";
  } else {
    getWeatherData(cityValue);
  }
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log(data);

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)} °C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind: ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img
            src="http://openweathermap.org/img/wn/${icon}.png"
            alt="Weather Icon"
          />`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
