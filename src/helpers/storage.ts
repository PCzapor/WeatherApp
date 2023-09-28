import { fetchCityData } from "../queries/getCity";
import { StorageKeys } from "./../types/index";

const USERS_FIXED = [
  {
    login: "admin",
    password: "admin",
  },
  {
    login: "admin1",
    password: "admin1",
  },
];

export class Storage {
  static getLoggedUser(): { login: string; password: string } {
    const user = localStorage.getItem(StorageKeys.User);
    if (!user) throw "Not logged in";
    return JSON.parse(user);
  }

  static LogIn(login: string, password: string) {
    if (!login) throw "Login cannot be empty";
    if (!password) throw "Password cannot be empty";
    const existingUser = USERS_FIXED.find((el) => {
      return el.login === login;
    });
    if (!existingUser) throw "User not found";
    if (existingUser.password !== password) throw "Password does not match";
    return localStorage.setItem(StorageKeys.User, JSON.stringify(existingUser));
  }

  static setActiveCity(cityName: string) {
    return localStorage.setItem(StorageKeys.ActiveCity, cityName);
  }
  static getActiveCity() {
    return localStorage.getItem(StorageKeys.ActiveCity);
  }

  static logOut() {
    const user = localStorage.getItem(StorageKeys.User);
    if (!user) return;
    return localStorage.removeItem(StorageKeys.User);
  }

  static getFavorites() {
    const user = Storage.getLoggedUser();
    const favorites = localStorage.getItem(
      `${StorageKeys.Favorites}_${user.login}`
    );
    return favorites ? JSON.parse(favorites) : null;
  }

  static async addFavorite(cityName: string) {
    const user = Storage.getLoggedUser();
    const key = `${StorageKeys.Favorites}_${user.login}`;
    const existingObject = localStorage.getItem(key);

    try {
      const exisitingCity = await fetchCityData(cityName);
      if (!exisitingCity) {
        return;
      }
      if (!existingObject) {
        const value = [cityName];
        return localStorage.setItem(key, JSON.stringify(value));
      }

      const newExistingObject: string[] = JSON.parse(existingObject);

      if (newExistingObject.includes(cityName)) return;

      newExistingObject.push(cityName);

      return localStorage.setItem(key, JSON.stringify(newExistingObject));
    } catch (error) {
      console.error("Error adding city:", error);
    }
  }
  static removeFavorite(cityName: string) {
    const user = Storage.getLoggedUser();
    const key = `${StorageKeys.Favorites}_${user.login}`;
    const existingObject = localStorage.getItem(key);

    if (!existingObject) return;

    const newExistingObject: string[] = JSON.parse(existingObject);

    if (!newExistingObject.includes(cityName)) return;

    const _array = newExistingObject.filter((e) => e !== cityName);

    return localStorage.setItem(key, JSON.stringify(_array));
  }
}
