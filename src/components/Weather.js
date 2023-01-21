import { useState, useEffect } from "react";
import Card from "./Card";
import "./style.css";
const Weather = () => {
    const [searchValue, setSearchValue] = useState("karachi");
    const [tempInfo, setTempInfo] = useState({});
  
    const getWeatherInfo = async () => {
      try {
        const api_key = "9e2b52a2495a2044bf0e97bb217d81b8"
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${api_key}`;
  
        let res = await fetch(url);
        let data = await res.json();
  
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;
  
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
        };
  
        setTempInfo(myNewWeatherInfo);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getWeatherInfo();
      console.log(getWeatherInfo)
    }, []);
  
    return (
      <>
        <div className="wrap">
          <div className="search">
            <input
              type="search"
              placeholder="Enter City "
              autoFocus
              id="search"
              className="searchTerm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
  
            <button
              className="searchButton"
              type="button"
              onClick={getWeatherInfo}>
              Search
            </button>
          </div>
        </div>
  
          <Card {...tempInfo} />
      </>
    );
  };
  
  export default Weather