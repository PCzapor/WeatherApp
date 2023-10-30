import { fetchCityData } from "components/api/fetch";
import { useQuery } from "react-query";

export const useGetCity = (cityName: string) =>
  useQuery(
    ["getCity", cityName],
    async () => {
      const response = await fetchCityData(cityName);
      const data = Array.isArray(response) ? response[0] : response;

      return data;
    },
    { enabled: false, refetchOnWindowFocus: false }
  );
