import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Lottie from "react-lottie";
import * as sunnyWeatherAnimation from "./assets/sunnyWeather.json";
import * as cloudyWeatherAnimation from "./assets/cloudyWeather.json";
import * as rainyWeatherAnimation from "./assets/rainyWeather.json";
import * as snowyWeatherAnimation from "./assets/snowyWeather.json";

function App() {
  const [url, setUrl] = useState("https://wttr.in/israel?lang=en&format=j1");
  const [weatherData, setWeatherData] = useState(null);
  const [locationSearch, setLocationSearch] = useState("");
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sunnyAnimation = {
    loop: true,
    autoplay: true,
    animationData: sunnyWeatherAnimation.default,
  };

  const cloudyAnimation = {
    loop: true,
    autoplay: true,
    animationData: cloudyWeatherAnimation.default,
  };

  const rainyAnimation = {
    loop: true,
    autoplay: true,
    animationData: rainyWeatherAnimation.default,
  };

  const snowyAnimation = {
    loop: true,
    autoplay: true,
    animationData: snowyWeatherAnimation.default,
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [url]);

  return (
    <div>
      {hasError && <p>Something went wrong.</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div
          className={
            weatherData.current_condition[0].weatherDesc[0].value.match(
              /Sunny|clear/i
            )
              ? "screen sunny"
              : weatherData.current_condition[0].weatherDesc[0].value.match(
                  /drizzle|mist|Rain/i
                )
              ? "screen rainy"
              : weatherData.current_condition[0].weatherDesc[0].value.match(
                  /cloud|overcast/i
                )
              ? "screen cloudy"
              : weatherData.current_condition[0].weatherDesc[0].value.match(
                  /snow|ice/i
                )
              ? "screen snowy"
              : "screen"
          }
        >
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              setUrl(`https://wttr.in/${locationSearch}?lang=en&format=j1`);
              setCityName(locationSearch.toLowerCase());
            }}
          >
            <input
              type="search"
              required
              pattern="[a-z A-Z]+"
              name="location"
              className="search-box"
              placeholder="Search city name..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>
          <div className="location-box">
            {cityName && cityName + ", "}
            {weatherData && weatherData.nearest_area[0].region[0].value},{" "}
            {weatherData && weatherData.nearest_area[0].country[0].value}
          </div>
          <div className="date-box">
            {hasError && <p>Something went wrong.</p>}
            Forecast time:{" "}
            {weatherData && weatherData.current_condition[0].localObsDateTime}
          </div>
          <div className="temperature-box">
            {weatherData && weatherData.current_condition[0].temp_C}°C
          </div>
          <div className="weather-desc">
            {weatherData &&
              weatherData.current_condition[0].weatherDesc[0].value}
          </div>
          <div>
            {weatherData.current_condition[0].weatherDesc[0].value.match(
              /Sunny|clear/i
            ) ? (
              <Lottie options={sunnyAnimation} height={200} width={200} />
            ) : weatherData.current_condition[0].weatherDesc[0].value.match(
                /cloud|overcast/i
              ) ? (
              <Lottie options={cloudyAnimation} height={200} width={200} />
            ) : weatherData.current_condition[0].weatherDesc[0].value.match(
              /drizzle|mist|Rain/i
            )
          ? <Lottie options={rainyAnimation} height={200} width={200} />:weatherData.current_condition[0].weatherDesc[0].value.match(
            /snow|ice/i
          )
        ? <Lottie options={snowyAnimation} height={200} width={200} />:null}
          </div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
