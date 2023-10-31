export const apiKey =
    process.env.REACT_APP_API_KEY || "place_your_api_key_here";
export const iconApiKey = (iconCode: string) =>
    `${process.env.REACT_APP_BASE_ICON_URL}${iconCode}.png`;
