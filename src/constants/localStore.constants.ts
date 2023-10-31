import { StorageKeys } from "types";

export const getFavortiesKey = () => {
    const user = localStorage.getItem(StorageKeys.User);
    if (!user) throw "not logged in";
    return `${StorageKeys.Favorites}_${user}`;
};
