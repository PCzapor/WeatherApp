import axios from "axios";
import React from "react";
import { CityList } from "src/constants/cityList";



const Cities = () => {
  return (
    <div>
      {CityList.map((item, idx) => {
        <div>{item.country}</div>;
      })}
    </div>
  );
};

export default Cities;
