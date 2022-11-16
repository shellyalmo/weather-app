import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function App() {

  let [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch("https://wttr.in/?lang=en&format=j1")
    .then(response => response.json())
    .then(data => setWeatherData(data))
  },[]);


  return (
    <div className='screen'>
      <div className='date-box'>
       { weatherData && weatherData.current_condition[0].localObsDateTime}
      </div>
      In {weatherData && (weatherData.nearest_area[0].country[0].value)} the current temperature is {weatherData && (weatherData.current_condition[0].temp_C)}°C
      <div className='search-bar'>
        <input
        type="text"
        placeholder='city name...'
        />
      </div>
    </div>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);