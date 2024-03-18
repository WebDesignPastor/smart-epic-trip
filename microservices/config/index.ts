import dotenv from "dotenv";

dotenv.config()
const config = {
    services: {
        googleApi: {
            url: process.env.GOOGLE_API_URL || "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            apiKey: process.env.GOOGLE_API_KEY
        },
        googleGeocode: {
            url: process.env.GOOGLE_API_GEOCODE_URL || "https://maps.googleapis.com/maps/api/geocode/json"
        }
    },
    options: {
        radius: Number(process.env.RADIUS) || 50000,
        baseLocation: process.env.BASE_LOCATION || "48.6483208,-2.0347205"
    },
}

export default config