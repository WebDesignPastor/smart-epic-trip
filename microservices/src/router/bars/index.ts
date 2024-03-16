import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config";
import { getBars } from "../../services/bars/bars";
import { noApiKey } from "../../../utils/const";

export const barPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/bars/all",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params = request.query as PlaceApiReqParams

                params.location = params.location ? params.location : config.options.baseLocation

                params.radius = params.radius ? params.radius : config.options.radius

                if (!config.services.googleApi.apiKey) {
                    return noApiKey
                }

                const result: PlaceApiResResult[] = await getBars(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            } 
        }
    )
}