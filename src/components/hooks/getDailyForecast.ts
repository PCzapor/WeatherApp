import {  fetchDailyForecast } from "components/api/fetch";
import { useQuery } from "react-query";


export const useDailyForecast = (cityName: string) =>
  useQuery(
    ["dailyForecast", cityName],
    async () => await fetchDailyForecast(cityName),
    {
      enabled: !!cityName,
      refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    }
  );
