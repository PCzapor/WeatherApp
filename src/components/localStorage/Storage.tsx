import { StorageKeys } from "types";

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

export function GetLoggedInUser(): { login: string } {
    const user = localStorage.getItem(StorageKeys.User);
    if (!user) throw "not logged in";

    return JSON.parse(user);
}
export function LogIn(username: string) {
    const existingUser = USERS_FIXED.find((user) => {
        return user.login === username;
    });
    return localStorage.setItem(
        StorageKeys.User,
        JSON.stringify(existingUser?.login)
    );
}
export function LogOut() {
    const user = localStorage.getItem(StorageKeys.User);
    if (!user) return;
    return localStorage.removeItem(user);
}
export async function SetFavorites(cityName: string) {
    const user = GetLoggedInUser();
    const key = `${StorageKeys.Favorites}_${user}`;
    const existingObject = localStorage.getItem(key);

    if (!existingObject) {
        return localStorage.setItem(key, JSON.stringify([cityName]));
    }
    const newExistingObject: string[] = JSON.parse(existingObject);
    if (newExistingObject.includes(cityName)) return;
    newExistingObject.push(cityName);
    return localStorage.setItem(key, JSON.stringify(newExistingObject));
}
export function RemoveFavorites(cityName: string) {
    const user = GetLoggedInUser();
    const key = `${StorageKeys.Favorites}_${user}`;
    const existingObject = localStorage.getItem(key);
    if (!existingObject) return;
    const newExistingObject: string[] = JSON.parse(existingObject);
    if (!newExistingObject.includes(cityName)) return;
    const arr = newExistingObject.filter((e) => e !== cityName);
    return localStorage.setItem(key, JSON.stringify(arr));
}
export function GetFavorites(): string[] {
    const user = GetLoggedInUser();
    const existingFavorites = localStorage.getItem(
        `${StorageKeys.Favorites}_${user}`
    );
    if (!existingFavorites) return [];
    console.log("existingFavorites", existingFavorites);
    return JSON.parse(existingFavorites);
}
