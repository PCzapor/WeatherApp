import React from "react";
import WeatherDay from "./WeatherDay";
import { use5DayForecast } from "../queries/get5DayForecast";
import { CityData5Days, WeatherDataItem } from "../types";

type Props = {
  active: string;
};

const WeatherWeek: React.FC<Props> = ({ active }) => {
  const { data: City5Data, isLoading } = use5DayForecast(active);

  if (!active) return <>Loading..</>;
  if (!City5Data) return <>please select a city</>;
  if (isLoading) return <>Loading..</>;

  function groupWeatherDataByDay(data: CityData5Days) {
    const groupedData: { [date: string]: WeatherDataItem[] } = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    return groupedData;
  }

  function calculateWeatherStatsByDay(groupedData: {
    [date: string]: WeatherDataItem[];
  }) {
    const weatherStats = [];
    for (const date in groupedData) {
      const dailyData = groupedData[date];
      const temperatures = dailyData.map((item) => item.main.temp);
      const humidityValues = dailyData.map((item) => item.main.humidity);
      const icon = dailyData.map((item) => item.weather[0].icon);
      const lowestTemp = Math.min(...temperatures);
      const avgTemp =
        temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
      const highestTemp = Math.max(...temperatures);
      const avgHumidity =
        humidityValues.reduce((sum, humidity) => sum + humidity, 0) /
        humidityValues.length;

      weatherStats.push({
        date,
        icon,
        avgTemp,
        lowestTemp,
        highestTemp,
        avgHumidity,
      });
    }
    return weatherStats;
  }

  const groupedData = groupWeatherDataByDay(City5Data);
  const weatherStats = calculateWeatherStatsByDay(groupedData);

  return (
    <div className="w-75">
      {weatherStats.map((dayStats, idx) => (
        <div className="row justify center" key={idx}>
          <WeatherDay
            key={idx}
            cityName={active}
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