import axios from "axios";
import { apiKey } from "constants/apiKey.constants";
import { instnce } from "index";
import { CityData, CityData5Days } from "types";
import { CityDataResponse } from "types";

export const fetchCityData = async (cityName: string | null) => {
    const { data } = await axios.get<CityDataResponse[]>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    );
    return data;
};

export const fetchDailyForecast = async (lat: number, lon: number) => {
    const { data: weather } = await instnce.get<CityData>(
        `weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang="en"`
    );
    return weather;
};

export const fetchFiveDayForecast = async (lat: number, lon: number) => {
    const { data: weather } = await instnce.get<CityData5Days>(
        `forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    return weather;
};
