import moment from "moment";
import WeatherGraph from "./WeatherGraph";
import { kelvinToCelsius } from "../../helpers/kelvinToCelcius";
import { iconApiKey } from "constants/apiKey.constants";

type WeatherDayProps = {
    iconCode: string;
    humidity: number;
    temp_max: number;
    temp_min: number;
    temp: number;
    date: string;
};

const WeatherDay = ({
    iconCode,
    humidity,
    temp_max,
    temp_min,
    temp,
    date,
}: WeatherDayProps) => {
    const iconUrl = iconApiKey(iconCode);

    const lowesTemp = kelvinToCelsius(temp_min);
    const highestTemp = kelvinToCelsius(temp_max);

    return (
        <>
            <div className="row justify-content-between w-100 align-items-center">
                <div className="col-3">{moment(date).format("Do dddd")}</div>
                <div className="col-2">
                    <i className="fas fa-tint text-primary" />{" "}
                    {Math.round(humidity)}%
                </div>
                {iconUrl && (
                    <img
                        className="col-1"
                        src={iconUrl}
                        alt="Weather Icon"
                        style={{ width: "30px", height: "30px" }}
                    />
                )}
                <div className="col-1"> {lowesTemp}</div>
                <div className="col-4">
                    <WeatherGraph
                        temp={temp}
                        temp_min={lowesTemp}
                        temp_max={highestTemp}
                    />
                </div>
                <div className="col-1"> {highestTemp}</div>
            </div>
        </>
    );
};

export default WeatherDay;
