import config from "../../../config"
import axios from "axios"

const baseUrl = `${config.services.googleGeocode.url}?key=${config.services.googleApi.apiKey}`

export const getGeocode = async (params: GeocodeApiReqParams) => {
    try {
        const fullUrl = `${baseUrl}&address=${params.address}`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}