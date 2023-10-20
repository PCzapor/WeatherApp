import moment from "moment";
import React from "react";
import { kelvinToCelsius } from "../helpers/kelvinToCelcius";
import { useDailyForecast } from "../queries/getDailyForecast";

type Props = {
  cityName: string;
};

const CurrentWeather: React.FC<Props> = ({ cityName }) => {
  const { data: CityData, isLoading } = useDailyForecast(cityName);
  if (isLoading) return <>Loading..</>;
  if (!CityData)
    return (
      <>There is no data to display, please add some cities to favorites</>
    );

  const iconCode = CityData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  const weekDay = moment(CityData.dt * 1000).isoWeekday();

  return (
    <div className="d-flex flex-column w-100 justify-content-center">
      <div className="d-flex justify-content-center">
        <div>
          {iconUrl && (
            <img
              src={iconUrl}
              alt="Weather Icon"
              style={{ width: "48px", height: "48px" }}
            />
          )}
        </div>
        <div className="d-flex flex-column align-items-center">
          <h5>{moment().isoWeekday(weekDay).format("[Today is] dddd")}</h5>
          <div>{moment().isoWeekday(weekDay).format("MMM Do")}</div>
        </div>
      </div>
      <div className="w-100 align-items-center display-2 mb-2 justify-content-center d-flex">
        {kelvinToCelsius(CityData.main.temp)}
        <div className="display-4 h-100 align-self-start">°C</div>
      </div>
      <div className="w-100 d-flex align-items-center mb-2 justify-content-center">
        {CityData.name}, {CityData.sys.country}
      </div>
      <div className="w-100 d-flex align-items-center  justify-content-center">
        Feels like {kelvinToCelsius(CityData.main.feels_like)}°C, sunset{" "}
        {moment(CityData.sys.sunset * 1000).format("h:mm A")}
      </div>
    </div>
  );
};

export default CurrentWeather;
