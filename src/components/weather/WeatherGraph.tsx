import React from "react";
import { kelvinToCelsius } from "../../helpers/kelvinToCelcius";

type WeatherGraphProps = {
  temp: number;
  temp_min: number;
  temp_max: number;
};

const WeatherGraph: React.FC<WeatherGraphProps> = ({
  temp,
  temp_min,
  temp_max,
}) => {
  const weekMax = temp_max + temp_max * 0.05;
  const weekMin = temp_min - temp_min * 0.05;
  const conversion = 100 / (weekMax - weekMin);

  const weekMinToDayMin = conversion * (temp_min - weekMin);
  const averageTemp = (temp_max + temp_min) / 2;

  const center = kelvinToCelsius(temp);
  const centerToDayMax = conversion * (temp_max - averageTemp);
  const maxTempDiff = conversion * (weekMax - temp_max);
  return (
    <>
      <div
        style={{ height: "4px", minWidth: "200px" }}
        className="progress  w-25"
      >
        <div
          className="progress-bar bg-transparent"
          role="progressbar"
          style={{ width: `${weekMinToDayMin}%` }}
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={weekMinToDayMin}
        ></div>

        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: `${center}%` }}
          aria-valuenow={weekMinToDayMin}
          aria-valuemin={weekMinToDayMin}
          aria-valuemax={center}
        ></div>

        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{ width: `${centerToDayMax}%` }}
          aria-valuenow={center}
          aria-valuemin={center}
          aria-valuemax={maxTempDiff}
        ></div>

        <div
          className="progress-bar bg-transparent"
          role="progressbar"
          style={{ width: `${maxTempDiff}%` }}
          aria-valuenow={centerToDayMax}
          aria-valuemin={centerToDayMax}
          aria-valuemax={maxTempDiff}
        ></div>
      </div>
    </>
  );
};

export default WeatherGraph;
