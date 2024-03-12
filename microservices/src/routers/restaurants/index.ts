import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import HttpError from "../../httpError";
import config from "../../../config";
import { getRestaurants } from "../../services/restaurants/restaurant";

export const restaurantPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/restaurants/all",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params = request.query as IRestaurantParams

                // if (!params.pagetoken) {
                //     return new HttpError(400, "pagetoken is required")
                // }

                params.location = params.location ? params.location : config.options.baseLocation

                params.radius = params.radius ? params.radius : config.options.radius

                const result = await getRestaurants(params)
                return result
            } catch (error: any) {
                throw new HttpError(error.statusCode, error.message)
            } 
        }
    )
}