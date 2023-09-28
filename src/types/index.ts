export type CityData = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
};
export type CityData5Days = {
  name: string;
  list: [
    {
      dt: number;
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
      };
      sys: {
        pod: string;
      };
      dt_txt: string;
    }
  ];
};
export type WeatherDataItem = {
  dt: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};
export type CityDataResponse = {
  country: string;
  lat: number;
  local_names: Record<string, any>;
  lon: number;
  name: string;
  state: string;
};

export type CityList = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
};

export enum StorageKeys {
  Favorites = "weather_app_favorites",
  User = "selected_user",
  ActiveCity = "weather_app_active_city",
}
