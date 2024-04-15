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
        },
        googlePlaceDetails: {
            url: process.env.GOOGLE_API_PLACE_DETAILS_URL || "https://maps.googleapis.com/maps/api/place/details/json",
        },
        ticketMaster: {
            url: process.env.TICKETMASTER_API_URL || "https://app.ticketmaster.com/discovery/v2/events",
            apiKey: process.env.TICKETMASTER_API_KEY
        }
    },
    options: {
        radius: Number(process.env.RADIUS) || 50000,
        baseLocation: process.env.BASE_LOCATION || "48.6483208,-2.0347205"
    },
}

export default config