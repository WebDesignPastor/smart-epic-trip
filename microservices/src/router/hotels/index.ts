import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config";
import { getRestaurants } from "../../services/restaurants/restaurant";
import { noApiKey } from "../../../utils/const";
import { getHotels } from "../../services/hotel/hotel";

export const hotelPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/hotels/all",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params = request.query as PlaceApiReqParams

                params.location = params.location ? params.location : config.options.baseLocation

                params.radius = params.radius ? params.radius : config.options.radius

                if (!config.services.googleApi.apiKey) {
                    return noApiKey
                }

                const result: PlaceApiResResult[] = await getHotels(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            } 
        }
    )
}