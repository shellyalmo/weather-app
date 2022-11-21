import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  let [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch("https://wttr.in/?lang=en&format=j1")
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {hasError && <p>Something went wrong.</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className={(weatherData.current_condition[0].weatherDesc[0].value.match(/Sunny/i))?('screen sunny'):((weatherData.current_condition[0].weatherDesc[0].value.match(/Rain/i)) ? ('screen rainy') : ('screen'))}>
          <div className="location-box">
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
          {/* <div className="search-bar">
            <input type="search" placeholder="city name..." />
            <button>Show weather</button>
          </div> */}
          {/* <div className="weather-by-city-box">city weather</div> */}
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
