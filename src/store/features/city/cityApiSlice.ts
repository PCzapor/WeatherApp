import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface City {
    country: string;
    name: string;
    lat: number;
    lon: number;
}
interface QueryArgument {
    limit: number;
    cityName: string;
}
const API_KEY = "c1b3bc542ae7be31ea8b9675cfa46e13";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://api.openweathermap.org/geo/1.0/direct?",
        prepareHeaders(headers) {
            headers.set("x-api-key", API_KEY);
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            fetchCities: builder.query<City[], QueryArgument>({
                query: ({ limit = 999, cityName }) => {
                    return `/q=${cityName}&limit=${limit}&appid=${process.env.REACT_APP_API_KEY}`;
                },
            }),
        };
    },
});
export default apiSlice;
export const { useFetchCitiesQuery } = apiSlice;
