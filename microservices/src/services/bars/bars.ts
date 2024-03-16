import config from "../../../config"
import axios from "axios"

const type = "bar"

const baseUrl = `${config.services.googleApi.url}?key=${config.services.googleApi.apiKey}&type=${type}`

export const getBars = async (params: PlaceApiReqParams) => {
    try {
        const fullUrl = `${baseUrl}&location=${params.location}&radius=${params.radius}&keyword=bar`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}