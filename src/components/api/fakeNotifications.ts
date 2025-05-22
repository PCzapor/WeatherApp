const notificationMap: Record<string, string[]> = {
  paris: [
    "🗼 Eiffel Tower night lights show at 9PM!",
    "🥖 Baguette fest today in Montmartre.",
    "🎨 Free entry to Louvre for students.",
    "☔ Rain forecast – bring your umbrella.",
  ],
  london: [
    "🎭 Shakespeare play in Globe Theatre tonight.",
    "🚇 Tube line disruptions – plan ahead.",
    "☀️ Sunny afternoon by the Thames!",
    "🎶 Live music at Camden Market.",
  ],
  barcelona: [
    "⚽ Barça match starts at 21:00!",
    "🍷 Wine tasting in El Born district.",
    "🏖️ Beach yoga every morning at 8AM.",
    "🕺 Flamenco night in Gothic Quarter.",
  ],
  rome: [
    "🏛️ Free tour of the Colosseum today.",
    "🍕 Pizza fest in Trastevere square.",
    "🛵 Scooter rentals - 50% discount!",
    "⛪ Vatican museum open till midnight.",
  ],
}

export async function fetchCityNotifications(
  cities: string[]
): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const picked: string[] = []

      cities.forEach((city) => {
        const key = city.toLowerCase()
        const messages = notificationMap[key]
        if (messages) {
          const randomMsg =
            messages[Math.floor(Math.random() * messages.length)]
          picked.push(`[${city}] ${randomMsg}`)
        }
      })

      resolve(picked.slice(0, 4))
    }, 1000)
  })
}
