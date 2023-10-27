import { fetchCityData, fetchDailyForecast } from "components/api/fetch";
import { useQuery } from "react-query";

export const useDailyForecast = (cityName: string) =>
    useQuery(
        ["dailyForecast", cityName],
        async () => {
            const city = await fetchCityData(cityName);
            const { lon, lat } = city[0];
            const data = await fetchDailyForecast(lat, lon);

            return data;
        },
        {
            enabled: !!cityName,
            //  refetchInterval: 1000 * 60,
            refetchOnWindowFocus: false,
        }
    );
