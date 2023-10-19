import { useEffect, useState } from "react";
import { MyGlobalContext } from "..";
import { Storage } from "../helpers/storage";
import CurrentWeather from "./CurrentWeather";
import Search from "./Search";
import { UserRow } from "./UserRow";
import WeatherCardCarousel from "./WeatherCardCarousel";
import WeatherWeek from "./WeatherWeek";



const Dashboard = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const storedFavorites = Storage.getFavorites();
    if (!storedFavorites) return;
    
    if (storedFavorites.length > 0 && !active) {
      setFavorites(storedFavorites);
      setActive(storedFavorites[0]);
    }
  }, []);
  const handleActive = (cityName: string) => {
    if (favorites.length === 1) return setActive(favorites[0]);
    setActive(cityName);
  };
  const handleAddFavorite = (cityName: string) => {
    setFavorites([...favorites, cityName]);
  };

  const handleRemoveFavorite = (cityName: string) => {
    Storage.removeFavorite(cityName);
    setFavorites(favorites.filter((city) => city !== cityName));
  };
  const city = Storage.getActiveCity();

  return (
    <MyGlobalContext.Provider value={{favorites,active}}>
    <main className="container px-0 h-100 w-100 d-flex align-items-center  justify-content-center">
      <div
        style={{ height: "85%", backgroundColor: "lightgreen" }}
        className="d-flex flex-column w-100 px-4 align-items-center rounded-lg"
      >
        <div className="row ml-0 mt-5 w-100">
          <div className="col-7 ">
            <div className="row">
              <Search />
            </div>
            <div className="row display-4 mb-4">
              Weather <strong> Forecast</strong>
            </div>
          </div>
          <div className="col-5">
            <UserRow />
          </div>
        </div>
        <div className="row ml-0 mb-4 w-100">
          <div className="col-7 pl-0 w-100">
            <WeatherCardCarousel
              handleActive={handleActive}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
              />
          </div>
          <div className="col-5 w-100">
            {!city ? (
              <div>Add first city to your favorites </div>
              ) : (
                <CurrentWeather cityName={active} />
                )}
          </div>
        </div>
        <div className="row justify-content-center ml-0 w-100 mb-4">
          <WeatherWeek  />
        </div>
      </div>
    </main>
   </MyGlobalContext.Provider>
  );
};

export default Dashboard;
