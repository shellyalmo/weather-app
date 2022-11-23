import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [url,setUrl] = useState("https://wttr.in/israel?lang=en&format=j1")
  const [weatherData, setWeatherData] = useState(null);
  const [locationSearch, setLocationSearch] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
          <form onSubmit={(e) => {
            e.preventDefault();
            setUrl(`https://wttr.in/${locationSearch}?lang=en&format=j1`)}}> 
              <input
              // onsubmit does post and reload by default
              // add label and name
                type="text"
                className="search-box"
                placeholder="Search..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                // onInput={handleLocationSearch}
              />
          </form>
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
