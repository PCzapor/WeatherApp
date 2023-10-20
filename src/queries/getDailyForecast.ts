import axios from "axios";
import { useQuery } from "react-query";
import { CityData } from "types";
import { fetchCityData } from "./getCity";

const fetchDailyForecast = async (cityName: string) => {
  const apiKey = process.env.REACT_APP_API_KEY || "place_your_api_key_here";
  const city = await fetchCityData(cityName);
  if (!city) return;
  const weather = await axios.get<CityData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&lang="en"`
  );
  return weather.data;
};

export const useDailyForecast = (cityName: string) =>
  useQuery(
    ["daily", "forecast", cityName],
    async () => await fetchDailyForecast(cityName),
    {
      enabled: !!cityName,
      refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    }
  );
