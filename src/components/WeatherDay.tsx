import moment from "moment";
import React from "react";
import WeatherGraph from "./WeatherGraph";
import { kelvinToCelsius } from "../helpers/kelvinToCelcius";
import { useDailyForecast } from "../queries/getDailyForecast";

type Props = {
  cityName: string;
  iconCode: string;
  humidity: number;
  temp_max: number;
  temp_min: number;
  temp: number;
  date: string;
};

const WeatherDay: React.FC<Props> = ({
  cityName,
  iconCode,
  humidity,
  temp_max,
  temp_min,
  temp,
  date,
}) => {
  const { data: CityData, isLoading } = useDailyForecast(cityName);
  
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
  const lowesTemp = kelvinToCelsius(temp_min);
  const highestTemp = kelvinToCelsius(temp_max);
  
  if (isLoading || !CityData) return <div>Loading..</div>;
  return (
    <>
      <div className="row justify-content-between w-100 align-items-center">
        <div className="col-3">{moment(date).format("Do dddd")}</div>
        <div className="col-2">
          <i className="fas fa-tint text-primary" /> {Math.round(humidity)}%
        </div>
        {iconUrl && (
          <img
            className="col-1"
            src={iconUrl}
            alt="Weather Icon"
            style={{ width: "30px", height: "30px" }}
          />
        )}
        <div className="col-1"> {lowesTemp}</div>
        <div className="col-4">
          <WeatherGraph
            temp={temp}
            temp_min={lowesTemp}
            temp_max={highestTemp}
          />
        </div>
        <div className="col-1"> {highestTemp}</div>
      </div>
    </>
  );
};

export default WeatherDay;
