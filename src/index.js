function updateTime() {
  let now = new Date();

  let dateTime = document.querySelector("#current-time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  dateTime.innerHTML = `${day} ${hour}:${minute}`;
}

updateTime();
setInterval(updateTime, 1000);

let apiKey = "t40o1483d2c1bd8dfe8cac9a5fcf64e1";

function updateTemp(response) {
  let currentTemp = response.data.temperature.current;
  let displayedTemp = document.querySelector("#current-temp");

  displayedTemp.textContent = `${Math.round(currentTemp)}`;
}

function updateCityResult(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#city-input");
  let chosenCity = document.querySelector("#main-city");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateTemp);
  chosenCity.textContent = `${searchInput.value}`;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", updateCityResult);
