import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config";
import { noApiKey } from "../../../utils/const";
import { getEvents } from "../../services/events/events";

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
}