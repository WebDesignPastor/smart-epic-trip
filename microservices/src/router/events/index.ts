import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config";
import { noApiKey } from "../../../utils/const";
import { getEvents } from "../../services/events/events";
import { request } from "http";
import { getEventsDetails } from "../../services/eventsDetails/eventsDetails";

export const eventsPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/events",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params = request.query as EventParams

                if (!config.services.ticketMaster.apiKey) {
                    return noApiKey
                }

                const result = await getEvents(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            } 
        }
    )

    fastify.get(
        "/events/:event_id",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                if(!config.services.ticketMaster.apiKey) {
                    return noApiKey
                }
                
                const params = request.params as {event_id: string}
                console.log(params)

                if(!params.event_id) {
                    return Error
                }

                const result = await getEventsDetails(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            }
        }
    )
}