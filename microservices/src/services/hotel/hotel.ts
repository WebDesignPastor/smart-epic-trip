import config from "../../../config"
import axios from "axios"

const type = "lodging"

const baseUrl = `${config.services.googleApi.url}?key=${config.services.googleApi.apiKey}&type=${type}`

export const getHotels = async (params: PlaceApiReqParams) => {
    try {
        const fullUrl = `${baseUrl}&location=${params.location}&radius=${params.radius}&keyword=lodging`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}