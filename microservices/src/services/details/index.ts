import config from "../../../config"
import axios from "axios"

const detailsBaseUrl = `${config.services.googlePlaceDetails.url}?key=${config.services.googleApi.apiKey}`

export const getPlacesById = async (params: PlaceDetailsRedParams) => {
    try {
        const fullUrl = `${detailsBaseUrl}&placeid=${params.place_id}`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}   