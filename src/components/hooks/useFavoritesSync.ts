import { GetLoggedInUser } from "components/localStorage/Storage"
import { useEffect } from "react"
import { useAppSelector } from "store/hooks"
import { StorageKeys } from "types"

export const useFavoritesSync = () => {
  const favorites = useAppSelector((s) => s.city.favorites)
  const user = GetLoggedInUser()
  const key = `${StorageKeys.Favorites}_${user}`
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites))
    console.log("favoritex", favorites)
    console.log("storage fav", localStorage.getItem(key))
  }, [favorites])
}

export default useFavoritesSync
