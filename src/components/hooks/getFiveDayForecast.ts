import { useQuery } from "react-query";
import { fetchFiveDayForecast } from "../api/fetch";




export const useFiveDayForecast = (cityName: string | null) =>
  useQuery(
    ["fiveDaysForecast", cityName],
    async () => await fetchFiveDayForecast(cityName),
    {
      enabled: !!cityName,
      refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    }
  );
