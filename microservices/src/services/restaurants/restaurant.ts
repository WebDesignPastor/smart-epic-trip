import config from "../../../config"
import { noApiKey } from "../../../utils/const"
import axios from "axios"

const type = "restaurant"

const baseUrl = `${config.services.googleApi.url}?key=${config.services.googleApi.apiKey}&type=${type}`

export const getRestaurants = async (params: PlaceApiReqParams) => {
    try {
        if (!config.services.googleApi.apiKey) {
            return noApiKey
        }
        const fullUrl = `${baseUrl}&location=${params.location}&radius=${params.radius}&keyword=restaurant`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}