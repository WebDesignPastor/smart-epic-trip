import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import config from "../../../config";
import { getRestaurants } from "../../services/restaurants/restaurant";

export const restaurantPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/restaurants/all",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params = request.query as PlaceApiReqParams

                // if (!params.pagetoken) {
                //     return new HttpError(400, "pagetoken is required")
                // }

                params.location = params.location ? params.location : config.options.baseLocation

                params.radius = params.radius ? params.radius : config.options.radius

                const result: PlaceApiResResult[] = await getRestaurants(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            } 
        }
    )
}