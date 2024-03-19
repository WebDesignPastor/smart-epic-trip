import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getPlacesById } from "../../services/details";

export const detailPlugin = async (fastify: FastifyInstance) => {

    fastify.get(
        "/details/:place_id",
        async (request: FastifyRequest, reply: FastifyReply) => {
            console.log(request)
            try {
                const params = request.params as PlaceDetailsRedParams
                
                if(!params.place_id) {
                    return Error
                }
                
                const result: PlaceApiResResult[] = await getPlacesById(params)
                reply.send(result)
            } catch (error: any) {
                reply.send({status: error.statusCode, message: error.message})
            } 
        }
    )
}