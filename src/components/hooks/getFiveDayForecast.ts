import { useQuery } from "react-query";
import { fetchCityData, fetchFiveDayForecast } from "../api/fetch";

export const useFiveDayForecast = (cityName: string | null) =>
    useQuery(
        ["fiveDaysForecast", cityName],
        async () => {
            const city = await fetchCityData(cityName);
            const { lon, lat } = city[0];
            const data = await fetchFiveDayForecast(lon, lat);

            return data;
        },
        {
            enabled: !!cityName,
            // refetchInterval: 1000 * 60,
            refetchOnWindowFocus: false,
        }
    );
