import config from "../../../config"
import { preparedParams } from "../../../utils/service"
import HttpError from "../../httpError"
import axios from "axios"

const type = "restaurant"

const baseUrl = `${config.services.googleApi.url}?key=${config.services.googleApi.apiKey}&type=${type}`

export const getRestaurants = async (params: IRestaurantParams) => {
    try {
        if (!config.services.googleApi.apiKey) {
            throw new HttpError(500, "No API key")
        }
        const fullUrl = `${baseUrl}&location=${params.location}&radius=${params.radius}&keyword=restaurant`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new HttpError(error.statusCode, error.message)
    }
}