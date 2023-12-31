import { useAppSelector } from "store/hooks";
import { CityData5Days, WeatherDataItem } from "../../types";
import { useFiveDayForecast } from "../hooks/getFiveDayForecast";
import WeatherDay from "./WeatherDay";

const WeatherWeek = () => {
    const active = useAppSelector((state) => state.rootReducer.city.active);

    const { data: City5Data, isLoading } = useFiveDayForecast(active);

    if (!active) return <>No active city</>;
    if (!City5Data) return <>please select a city</>;
    if (isLoading) return <>Loading..</>;

    function groupWeatherDataByDay(data: CityData5Days) {
        return data.list.reduce<Record<string, WeatherDataItem[]>>(
            (groupedData, item) => {
                const date = item.dt_txt.split(" ")[0];
                groupedData[date] = groupedData[date]
                    ? [...groupedData[date], item]
                    : [item];
                return groupedData;
            },
            {}
        );
    }

    const calculateWeatherStatsByDay = (
        groupedData: Record<string, WeatherDataItem[]>
    ) =>
        Object.keys(groupedData).map((date) => {
            const dailyData = groupedData[date];
            const { temperatures, humidityValues, icon } = dailyData.reduce(
                (acc, item) => {
                    acc.temperatures.push(item.main.temp);
                    acc.humidityValues.push(item.main.humidity);
                    acc.icon.push(item.weather[0].icon);
                    return acc;
                },
                {
                    temperatures: [] as number[],
                    humidityValues: [] as number[],
                    icon: [] as string[],
                }
            );
            const lowestTemp = Math.min(...temperatures);
            const avgTemp =
                temperatures.reduce((sum, temp) => sum + temp, 0) /
                    temperatures.length -
                1;
            const highestTemp = Math.max(...temperatures);
            const avgHumidity =
                humidityValues.reduce((sum, humidity) => sum + humidity, 0) /
                humidityValues.length;

            return {
                date,
                icon,
                avgTemp,
                lowestTemp,
                highestTemp,
                avgHumidity,
            };
        });
    const groupedData = groupWeatherDataByDay(City5Data);
    const weatherStats = calculateWeatherStatsByDay(groupedData);

    return (
        <div className="w-75">
            {weatherStats.map((dayStats, idx) => (
                <div className="row justify center" key={idx}>
                    <WeatherDay
                        key={idx}
                        date={dayStats.date}
                        temp={dayStats.avgTemp}
                        temp_min={dayStats.lowestTemp}
                        temp_max={dayStats.highestTemp}
                        humidity={dayStats.avgHumidity}
                        iconCode={dayStats.icon[0]}
                    />
                </div>
            ))}
        </div>
    );
};

export default WeatherWeek;
