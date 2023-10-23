import axios from "axios";
import { CityData, CityData5Days } from "types";
import { CityDataResponse } from "types";

const apiKey = process.env.REACT_APP_API_KEY || "place_your_api_key_here";


const baseUrl = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,timeout:1000,
  })
export const fetchCityData = async (cityName: string | null) => {
    const { data } = await axios.get<CityDataResponse[]>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
    );
    const city = data.find((element) => element.name === cityName);
    if (!city) return console.log("City not found");
    return city;
  };

  //zrobic usequery client zeby zapisywac nazwy miast i tutaj prezkazac tylko lon i lat 
  export const fetchDailyForecast = async (cityName: string) => {
    const apiKey = process.env.REACT_APP_API_KEY || "place_your_api_key_here";
    const city = await fetchCityData(cityName);
    if (!city) return;
    const weather = await axios.get<CityData>(
        `/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&lang="en"`
        );
        debugger
    return weather.data;
  };

export const fetchFiveDayForecast = async (cityName: string | null) => {
    const city = await fetchCityData(cityName);
    if (!city) return;
    const weather = axios.get<CityData5Days>(
       `${baseUrl}/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
    )
    // const data = await weather.get<CityData5Days>('').then(function(response){
    //    const data = response.data
    //   return data 
    //  });
     return console.log(weather);
  };