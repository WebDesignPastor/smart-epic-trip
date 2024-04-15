import config from "../../../config"
import axios from "axios"

const basseUrl = `${config.services.ticketMaster.url}?apikey=${config.services.ticketMaster.apiKey}`

export const getEvents = async (params: EventParams) => {
    try {
        const fullUrl = `${basseUrl}&size=20&radius=${params.radius}&latlong=${params.latlong}&startDateTime=${params.startDateTime}&endDateTime=${params.endDateTime}&locale=*`
        const result = await axios.get(fullUrl)
        const finalResult = result.data._embedded ? result.data._embedded : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}