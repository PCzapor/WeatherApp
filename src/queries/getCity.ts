import axios from "axios";
import { CityDataResponse } from "src/types";

export const fetchCityData = async (cityName: string | null) => {
  const apiKey = process.env.REACT_APP_API_KEY || "place_your_api_key_here";
  const { data } = await axios.get<CityDataResponse[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
  );
  const city = data.find((element) => element.name === cityName);
  if (!city) return console.log("City not found");

  return city;
};
