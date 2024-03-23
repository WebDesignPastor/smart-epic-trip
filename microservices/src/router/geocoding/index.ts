import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config";
import { noApiKey } from "../../../utils/const";
import { getGeocode } from "../../services/geocoding/geocoding";

export const geoCodingPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/geocode",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params = request.query as GeocodeApiReqParams

                params.address = params.address ? params.address : 'Rennes'

                if (!config.services.googleApi.apiKey) {
                    return noApiKey
                }

                const result = await getGeocode(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            } 
        }
    )
}