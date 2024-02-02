const apiKey = "c62f3399778eedd49610df480474de96";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const humidityText = document.querySelector(".humidity");
const windText = document.querySelector(".wind");
const cityText = document.querySelector(".city");
const tempText = document.querySelector(".temp");
const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const errorText = document.querySelector(".error");

const checkWeather = async (city) => {
  const data = await fetch(apiUrl + city + `&appid=` + apiKey);
  const json = await data.json();

  //error
  if (data.status == 404) {
    errorText.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const humidity = json?.main?.humidity + "%";
    const wind = json?.wind?.speed + "km/h";
    const temp = Math.round(json?.main?.temp) + "°C";
    humidityText.innerHTML = humidity;
    cityText.innerHTML = json?.name;
    windText.innerHTML = wind;
    tempText.innerHTML = temp;

    if (json?.weather[0]?.main == "Rain") {
      //rain
      weatherIcon.src = "assets/rain.png";
    } else if (json?.weather[0]?.main == "Clear") {
      //sun
      weatherIcon.src = "assets/sunny.png";
    } else if (json?.weather[0]?.main == "Clouds") {
      //clouds
      weatherIcon.src = "assets/clouds.png";
    } else if (json?.weather[0]?.main == "Drizzle") {
      //drizz
      weatherIcon.src = "assets/drizzle.png";
    } else if (json?.weather[0]?.main == "Mist") {
      //mist
      weatherIcon.src = "assets/mist.png";
    } else if (json?.weather[0]?.main == "Snow") {
      //snow
      weatherIcon.src = "assets/snow.png";
    }
    document.querySelector(".weather").style.display = "block";
    errorText.style.display = "none";
  }

  console.log(json);
};
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
