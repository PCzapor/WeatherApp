import { CityData5Days } from "../types/index";
import axios from "axios";
import { fetchCityData } from "./getCity";
import { useQuery } from "react-query";

const fetch5DayForecast = async (cityName: string | null) => {
  const apiKey = process.env.REACT_APP_API_KEY || "place_your_api_key_here";
  const city = await fetchCityData(cityName);
  if (!city) return;
  const weather = await axios.get<CityData5Days>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
  );
  return weather.data;
};

export const use5DayForecast = (cityName: string | null) =>
  useQuery(
    ["5days", "forecast", cityName],
    async () => await fetch5DayForecast(cityName),
    {
      enabled: !!cityName,
      // refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    }
  );
