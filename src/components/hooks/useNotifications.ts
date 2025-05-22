import { fetchCityNotifications } from "components/api/fakeNotifications"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "store/hooks"

export const useNotifications = () => {
  const favorites = useAppSelector((s) => s.city.favorites)
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    if (favorites.length === 0) return

    const load = async () => {
      const data = await fetchCityNotifications(favorites)
      setNotifications(data)
    }
    load()
    const interval = setInterval(load, 30_000)
    return () => {
      clearInterval(interval)
    }
  }, [favorites])
  return notifications
}
