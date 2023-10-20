import React from "react";
import { useDispatch } from "react-redux";
import { removeFavorite, setActive } from "helpers/citySlice";
import { useGlobalContext } from "..";
import { useDailyForecast } from "../queries/getDailyForecast";
type Props = {
  handleRemoveFavorite: (cityName: string) => void;
  cityName: string;
  handleActive: (cityName: string) => void;
};

const WeatherCard: React.FC<Props> = ({
  cityName,
  handleRemoveFavorite,
  handleActive,
}) => {
  const { data: CityData, isLoading } = useDailyForecast(cityName);
  const dispatch = useDispatch();
  const { active } = useGlobalContext();
  if (!CityData) return null;

  const { weather } = CityData;
  const weatherDescription = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={
        CityData.name === active
          ? `card px-1 mx-1 rounded-lg bg-primary`
          : `card px-1 mx-1 rounded-lg`
      }
      style={{
        maxHeight: "250px",
        minHeight: "250px",
        minWidth: "120px",
        maxWidth: "125px",
      }}
      role="button"
      onClick={() => {
        dispatch(setActive(cityName));
        handleActive(cityName);
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveFavorite(cityName);
          dispatch(removeFavorite(cityName));
        }}
        className="btn btn-danger btn-sm rounded-lg position-absolute"
        style={{
          top: "5px",
          right: "5px",
          cursor: "pointer",
        }}
      >
        X
      </button>

      <img
        src={iconUrl}
        style={{ height: "64px", width: "84px" }}
        alt="Weather Icon"
      />
      <div className="card-body">
        <h5 className="card-title">{CityData.name}</h5>
        <small className="card-text">{CityData.sys.country}</small>
        <p>
          <small className="card-text">{weatherDescription}</small>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
