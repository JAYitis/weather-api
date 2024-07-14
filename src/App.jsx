import { useState } from "react";
import "./App.css";
import axios from "axios";
// import

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    error: false,
    data: {},
    loading: false,
  });

  const dateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "649c5a38f087eaade0306e30ca5ecc5e";
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
    }
  };

  return (
    <div className="h-screen w-full bg-slate-400">
      <div className="flex items-center justify-center p-20 ">
        <div>
          <h1 className="p-8 mt-10 rounded-3xl text-black-700 w-50 bg-sky-700 text-2xl font-extrabold">
            Weather API
          </h1>
          <div className="mt-10  border-blue-700 border-2">
            <input
              type="text"
              className="search"
              placeholder="Enter City Name"
              name="query"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyPress={search}
            />
          </div>
          {weather.error && (
            <div className="mt-8">
              <span>City Not Found</span>
            </div>
          )}
          {weather && weather.data && weather.data.main && (
            <div className="mt-10 bg-gray-300 p-10">
              <div className="mb-5">
                <h2 className="text-slate-700 mb-5 font-bold">
                  {weather.data.name}, <span>{weather.data.sys.country}</span>
                </h2>
                <div>
                  <span>{dateFunction()}</span>
                </div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                  // weather[0].icon
                  alt={weather.data.weather[0].description}
                />
                <div>
                  Temp: 
                {Math.round(weather.data.main.temp)}
                <sup> °C</sup>
                </div>
                
              </div>
              <div>
                <div>Humidity: {weather.data.main.humidity}</div>
                <div>Wind Speed: {weather.data.wind.speed}</div>
                <div className="">
                  <p className="uppercase">
                    {weather.data.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
