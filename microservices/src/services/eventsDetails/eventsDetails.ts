import config from "../../../config"
import axios from "axios"

const basseUrl = `${config.services.ticketMaster.url}`

export const getEventsDetails = async (params: {event_id: string}) => {
    try {
        const fullUrl = `${basseUrl}/${params.event_id}?apikey=${config.services.ticketMaster.apiKey}`
        const result = await axios.get(fullUrl)
        const finalResult = result.data ? result.data : []
        return finalResult
    } catch (error: any) {
        throw new Error(error)
    }
}