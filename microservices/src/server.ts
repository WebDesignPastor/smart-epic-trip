import fastify from 'fastify'
import cors from "@fastify/cors"
import {
  restaurantPlugin,
  barPlugin,
  hotelPlugin,
  geoCodingPlugin,
  detailPlugin,
} from "./router"

export function build() {
    const server = fastify()

    server.register(cors, {
    origin: true,
    })
    server.register(restaurantPlugin)
    server.register(barPlugin)
    server.register(hotelPlugin)
    server.register(geoCodingPlugin)
    server.register(detailPlugin)

    server.get('/ping', async (request, reply) => {
    return 'pong\n'
    })

    return server
}